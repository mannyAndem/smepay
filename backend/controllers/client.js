const cloudinary = require('cloudinary').v2
const { validationResult } = require('express-validator')
const pdfDoc = require('pdfkit')
const fs = require('fs')
const path = require('path')

const User = require('../models/user')
const Client = require('../models/client')
const Invoice = require('../models/invoice')
const Item = require('../models/item')
const Transaction = require('../models/transaction')

const { cloudinary_api_key, cloudinary_api_secret, cloudinary_name, paystack_secret_key } = require('../config/secret_keys')
const { sendInvoice } = require('../config/sendmail')

cloudinary.config({
    cloud_name: cloudinary_name,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret
})



const notInDB = (data, errMsg) => {
    if(!data){
        const error = new Error(errMsg)
        error.statusCode = 401
        throw error
    }
}

const validateFunc = (request) => {
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        const error = new Error("Validation Failed")
        error.statusCode = 422
        error.data = errors.array()[0]
        throw error
    }
}



// -- CLIENTS --
exports.addClient = async (req, res, next) => {
    validateFunc(req)
    
    if(!req.file){
        const error = new Error("No Image Uploaded")
        error.statusCode = 422
        throw error
    }

    const { name, email, number, address, category, status, note } = req.body
    let image;
    const imageUrl = req.file.path

    // const user = await User.findById("658f6f6b1c4fe86457b48265")
    const user = await User.findById(req.userId)
    notInDB(user, "User Not Found")
    
    try {
        await cloudinary.uploader.upload(
            imageUrl,
            async (err, result) => {
                if(err){
                    const error = new Error("Error uploading image")
                    error.statusCode = 402
                    throw error
                }

                image = result.secure_url
                const client = new Client({
                    name, email, number, address, 
                    category, status, note, image, 
                    user: req.userId
                    // user: "658f6f6b1c4fe86457b48265"
                })
                
                const newClient = await client.save()
                user.clients.push(newClient)
                await user.save() 

                res.status(201).json({
                    message: "Successfully added client",
                    data: newClient
                })            
            }
        )    
    } catch (error) {
        res.status(500).json({ message: "Error Uploading image", info: error.message })
    }
}

exports.getClient = async (req, res) => {
    const { clientId } = req.params
    try {
        const client = await Client.findById(clientId)
        notInDB(client, "Client Not Found")

        res.status(200).json({
            message: "Successfully Fetched Client",
            info: client
        })
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Client", info: error.message })
    }
}

exports.fetchClients = async (req, res) => {
    try {
        const client = await Client.find({ user: req.userId })
        notInDB(client, "No Clients Found")

        res.status(200).json({
            message: "Successfully Fetched All Clients",
            info: client
        })
    } catch (error) {
        res.status(500).json({ message: "Error Fetching All Clients", info: error.message })
    }
}



// -- INVOICE --
exports.createInvoice = async (req, res) => {
    validateFunc(req)

    const { recipientEmail, description, issuedDate, 
        dueDate, billFrom, billTo } = req.body

    try {
        // const user = await User.findById("655e652c5eb5ec11f2cce543")
        const user = await User.findById(req.userId)
        notInDB(user, 'User Not Found')

        // const invQty = await Invoice.find({ user: "655e652c5eb5ec11f2cce543" }).countDocuments()
        const invQty = await Invoice.find({ user: req.userId }).countDocuments()
        
        const year = issuedDate.getFullYear()
        const month = issuedDate.getMonth() + 1
        const day = issuedDate.getDate()

        const invoice = new Invoice({
            invoiceNo: 'INV-' + day + '/' + month + '/' + year + '-' + (invQty + 1),
            recipientEmail, description, issuedDate, 
            dueDate, billFrom, billTo, user
        })

        const invId = invoice._id;

        await invoice.save()

        user.invoices.push(invoice)
        // await user.save() // no need for this code

        // -- TRANSACTION --        
        // first check if this user has any transaction, and with
        // a status of pending, if yes add this invoice to it
        // else, create a new transaction, then add this invoice
        // to it

        const existingTrans = await Transaction.findOne({
            $and: [
                // { user: "655e652c5eb5ec11f2cce543" },
                { user: req.userId },
                { status: 'pending'}
            ]
        })

        if(existingTrans){
            // push this invoice into this transaction
            // increase its outstanding by the amount on invoice
            existingTrans.invoices.push(invoice)
            existingTrans.outstanding += invoice.totalAmount
            await existingTrans.save()
        }
        
        if(!existingTrans){
            // create new transaction for this user
            // it'll get a "default" pending status
            const transaction = new Transaction({
                name: user.fullname, email: user.email, 
                outstanding: invoice.totalAmount, 
                user: req.userId
                // user: "655e652c5eb5ec11f2cce543"
            })
            // return console.log("I got here successfully")
            transaction.invoices.push(invoice)
            await transaction.save()
            
            user.transactions.push(transaction)
        }
        await user.save()

        
        // generate pdf of invoice
        const invoiceName = 'invoice-' + invId + '.pdf'
        const invoicePath = path.join('data', 'pdf',  invoiceName)

        const invoiceDoc = new pdfDoc({
            size: 'letter',
            font: 'Times-Roman',
            fontSize: 14,
        })

        res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"') // provides save as option
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/pdf') // helps open files in browser as inline (by default)
        res.status(201)

        invoiceDoc.pipe(fs.createWriteStream(invoicePath))
        await invoiceDoc.pipe(res)

        invoiceDoc.fontSize(40).text('Invoice')
        invoiceDoc.fontSize(20).text(`invoiceId: ${invId}`)

        invoiceDoc.text(user.name)
        invoiceDoc.text(user.email)
        invoiceDoc.moveDown()

        const Year = dueDate.getFullYear()
        const Month = dueDate.getMonth() + 1
        const Day = dueDate.getDate()

        invoiceDoc.text('Issued Date: ' + day + '/' + month + '/' + year + '()', {align: 'right'})
        invoiceDoc.text('Due Data: ' + Day + '/' + Month + '/' + Year, {align: 'right'})
        invoiceDoc.moveDown()

        invoiceDoc.lineCap('square').moveTo(250, 20).circle(275, 30, 15).stroke();
        invoiceDoc.fontSize(18).text('ITEMS DESCRIPTION  QTY  UNIT_PRICE  TOTAL').moveDown()
            
        let total = 16                
        const dis = 0.02 * total

        invoiceDoc.text('Subtotal = ' + '$' + total, {align: 'right'})
        invoiceDoc.text('Discount (2% off) = ' + '$' + dis.toFixed(3), {align: 'right'}).moveDown()
        invoiceDoc.text('Total = ' + '$' + (total - dis), {align: 'right'}).moveDown()

        invoiceDoc.fontSize(16).text('Thank you for using SMEPAY')
        
        //// BEGIN
        try {
            const cloudResp = await cloudinary.uploader.upload(
                invoicePath,
                {
                    resource_type: 'raw',
                    public_id: 'output.pdf',
                }
            )
            console.log(cloudResp.secure_url)
            sendInvoice(user.email, cloudResp.secure_url)

        } catch (error) {
            console.log(`Error uploading to cloudinary, ${error}`)
            throw error
        }

        invoiceDoc.end()


    } catch (error) {
        res.status(500).json({
            message: "Error Creating Invoice",
            info: error.message
        })
    }
}


// this function sends back the specific invoice info so that
// the user doen't have to reenter details that won't change
exports.getEditInvoice = async (req, res) => {
    const invoiceID = req.params.invoiceId;

    try {
        // const invoice = await Invoice.findById("6586129ab1ef1ec3b32b087b")
        const invoice = await Invoice.findById(invoiceID)
        notInDB(invoice, 'Invoice Not Found')   

        const { recipientEmail, description, issuedDate, 
                dueDate, billFrom, billTo } = invoice;
        
        res.status(200).json({
            recipientEmail, description, issuedDate, 
            dueDate, billFrom, billTo
        })

    } catch (error) {
        res.status(500).json({
            message: "Error Fetching Invoice Details",
            info: error.message
        })
    }
}

exports.postEditInvoice = async (req, res) => {
    const invoiceID = req.params.invoiceId
    validateFunc(req)

    const { recipientEmail, description, issuedDate, 
        dueDate, billFrom, billTo } = req.body

    try {
        // const invoice = await Invoice.find({ _id: "6586129ab1ef1ec3b32b087b", user: "655e652c5eb5ec11f2cce543" })
        const invoice = await Invoice.find({ _id: invoiceID, user: req.userId })
        notInDB(invoice, 'No Invoice Found or Unauthorized Access')

        invoice.recipientEmail = recipientEmail
        invoice.description = description
        invoice.issuedDate = issuedDate
        invoice.dueDate = dueDate
        invoice.billFrom = billFrom
        invoice.billTo = billTo

        const editedInvoice = await invoice.save()

        res.status(201).json({
            message: "Successfully edited invoice",
            data: editedInvoice
        })
        

    } catch (error) {
        res.status(500).json({
            message: "Error Creating Invoice",
            info: error.message
        })
    }
}


exports.getInvoice = async (req, res) => {
    const { invoiceId } = req.params

    try {
        const invoice = await Invoice.findById(invoiceId)
        notInDB(invoice, "Invoice Not Found")
        
        res.status(200).json({
            message: "Successfully Fetched Invoice",
            data: invoice
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching This Invoice",
            info: error.message
        })
    }
}

exports.fetchInvoice = async (req, res) => {
    try {
        // const invoices = await Invoice.find({ user: "655e652c5eb5ec11f2cce543" })
        // const user = await User.findById("655e652c5eb5ec11f2cce543")
        
        const invoices = await Invoice.find({ user: req.userId })
        const user = await User.findById(req.userId)
        notInDB(invoices, 'No Invoice Found')
    
        res.status(200).json({
            message: `Successfully Fetched All Invoices For ${user.fullname}`,
            data: invoices
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching All Invoices",
            info: error.message
        })
    }
}

exports.deleteInvoice = async (req, res) => {
    const invoiceID = req.params.invoiceId
    try {
        // const user = await User.findById("655e652c5eb5ec11f2cce543")
        // const invoice = await Invoice.find({ _id: "6586129ab1ef1ec3b32b087b", user: "655e652c5eb5ec11f2cce543" })
        
        const user = await User.findById(req.userId)
        notInDB(user, 'User Not Found')

        const invoice = await Invoice.find({ _id: invoiceID, user: req.userId })
        notInDB(invoice, 'No Invoice Found or Unauthorized Access')

        // delete this invoice from database
        await Invoice.findByIdAndRemove(invoiceID)
        
        // remove this invoice from user's invoice array
        user.invoices.pull(invoiceID)
        await user.save()

        res.status(200).json({
            message: `Successfully Deleted Invoice For ${user.fullname}`,
            data: invoice
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching All Invoices",
            info: error.message
        })
    }
}



// -- ITEMS --
exports.addItem = async (req, res) => {
    validateFunc(req)
    const { invoiceId } = req.params
    const { name, price, qty } = req.body
    
    try {
        const invoice = await Invoice.findById(invoiceId)
        notInDB(invoice, "Invoice Not Found")

        const transaction = await Transaction.findOne({
            $and: [
                { status: 'pending'},
                { user: req.userId },
                // { user: "658f6f6b1c4fe86457b48265" },
            ]
        })
        notInDB(transaction, 'Transaction Not Found')

        const item = new Item({ name, price, qty, invoice })
        invoice.items.push(item)
        await item.save()
        
        // add total amount to invoice
        invoice.totalAmount += (qty * price)
        await invoice.save()

        // add this amount to the pending transaction of this user
        transaction.outstanding += (qty * price)
        await transaction.save()

        res.status(201).json({
            message: 'Successfully Added Item to Invoice'
        })
    } catch (error) {
        res.status(500).json({
            message: "Error Adding Item",
            info: error.message
        })
    }
}

exports.getItem = async (req, res) => {
    const { itemId } = req.params

    try {
        const item = await Item.findById(itemId)
        notInDB(item, "Couldn't Find Item")
        
        res.status(200).json({
            message: "Successfully Fetched Item",
            data: item
        })
        
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching This Item",
            info: error.message
        })
    }
}

exports.fetchItems = async (req, res) => {
    const { invoiceId } = req.params
    try {
        const items = await Item.find({ invoice: invoiceId})
        notInDB(items, 'Items Not Found',)
    
        res.status(200).json({
            message: "Successfully Fetched All Items",
            data: items
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching All Items",
            info: error.message
        })
    }
}



// -- TRANSACTIONS --
exports.getTransaction = async (req, res) => {
    const { transactionId } = req.params

    try {
        // const transaction = await Transaction.findById(transactionId)
        
        const transaction = await Transaction.findById(transactionId)
        notInDB(transaction, "Couldn't Find transaction")
        
        res.status(200).json({
            message: "Successfully Fetched Transaction",
            data: transaction
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching This transaction",
            info: error.message
        })
    }
}

exports.fetchTransactions = async (req, res) => {
    try {
        // const transaction = await Transaction.find({ user: "655e652c5eb5ec11f2cce543" })
        // const user = await User.findById("655e652c5eb5ec11f2cce543")
        
        const transaction = await Transaction.find({ user: req.userId})
        const user = await User.findById(req.userId)
        notInDB(transaction, 'Transactions Not Found',)
    
        res.status(200).json({
            message: `Successfully Fetched All Transactions For ${user.fullname}`,
            data: transaction
        })

    } catch (error) {
        res.status(200).json({
            message: "Error Fetching All Transactions",
            info: error.message
        })
    }
}



// -- PAYMENTS --
exports.initiatePayment = async (req, res) => {
    const { transactionId } = req.parmas

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${paystack_secret_key}`,
            'Content-Type': 'application/json',
        }
    }
    
    try {
        const user = await User.findById("655e652c5eb5ec11f2cce543")
        // const user = await User.findById(req.userId)
        notInDB(user, "User Not Found")
        
        const transaction = await Transaction.find({
            $and: [
                { _id: transactionId},
                // { user: req.userId }
                { user: "655e652c5eb5ec11f2cce543" }
            ]
        })
        notInDB(transaction, "Transaction Not Found")

        const amount = transaction.outstanding
        const email = user.email
        const params = JSON.stringify({
            "email": email, "amount": amount * 100 
        })
        
        const request = await https.request(options, apiRes => {
            let data = ''
            apiRes.on('data', chunk => { data += chunk })
            apiRes.on('end', () => {
                return res.status(200).json(data)
            })
        }).on('error', err => { return res.status(400).json(err) })

        request.write(params)
        request.end()    

        // TRANSACTION
        // set transaction status to completed upon complete payment
        // maybe in the confirmPayment controller instead


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Error Processing Payment",
            info: error.message
        })
    }
}

exports.verifyPayment = async (req, res) => {
    //
}
