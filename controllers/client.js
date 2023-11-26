const cloudinary = require('cloudinary').v2
const { validationResult } = require('express-validator')

const User = require('../models/user')
const Client = require('../models/client')
const Invoice = require('../models/invoice')
const Item = require('../models/item')
const Transaction = require('../models/transaction')

const { cloudinary_api_key, cloudinary_api_secret, cloudinary_name } = require('../config/secret_keys')

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
        error.statusCode = 401
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


    try {
        // const user = await User.findById("655e652c5eb5ec11f2cce543")
        const user = await User.findById(req.userId)
        notInDB(user, "User Not Found")

        await cloudinary.uploader.upload(
            imageUrl,
            async (err, result) => {
                if(err){
                    const error = new Error("Error uploading image")
                    error.statusCode = 402
                    throw error
                }
                image = result.secure_url
            }
        )
        const client = new Client({
            name, email, number, address, category, status, 
            note, image, 
            user: req.userId
            // user: "655e652c5eb5ec11f2cce543"
        })

        const newClient = await client.save()

        user.clients.push(newClient)
        await user.save() 

        res.status(201).json({
            message: "Successfully added client",
            data: newClient
        })

    } catch (error) {
        res.status(500).json({ message: "Error Adding Client", info: error.message })
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
        const client = await Client.find()
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
    const { recipientEmail, description, issuedDate, 
        dueDate, billFrom, billTo } = req.body
    try {
        // const user = await User.findById("655e652c5eb5ec11f2cce543")
        const user = await User.findById(req.userId)
        notInDB(user, 'User Not Found')

        const invoice = new Invoice({
            recipientEmail, description, issuedDate, 
            dueDate, billFrom, billTo, user
        })
        await invoice.save()

        user.invoices.push(invoice)
        await user.save()

        res.status(201).json({
            message: 'Successfully created invoice',
            data: invoice
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
        const invoices = await Invoice.find()
        notInDB(invoices, 'No Invoice Found',)
    
        res.status(200).json({
            message: "Successfully Fetched All Invoice",
            data: invoices
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching All Invoice",
            info: error.message
        })
    }
}



// -- ITEMS --
exports.addItem = async (req, res) => {
    const { invoiceId } = req.params
    const { name, price, qty } = req.body
    try {
        const invoice = await Invoice.findById(invoiceId)
        notInDB(invoice, "Invoice Not Found")
        
        const item = new Item({ name, price, qty, invoice })
        await item.save()

        invoice.items.push(item)
        const updatedInvoice = await invoice.save()

        res.status(201).json({
            message: 'Successfully Added Item to Invoie',
            data: updatedInvoice
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
        // const item = await Item.findById(itemId).populate('invoice')
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
    try {
        const items = await Item.find()
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
exports.generateTransaction = async (req, res) => {
    validateFunc(req)
    
    const { name, email, outstandings } = req.body
    // add details, a list of all invoices by this user
}

exports.getTransaction = async (req, res) => {
    const { transactionId } = req.params

    try {
        // const transaction = await Transaction.findById(transactionId).populate('invoice')
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
        const transaction = await Transaction.find()
        notInDB(transaction, 'Transactions Not Found',)
    
        res.status(200).json({
            message: "Successfully Fetched All Transactions",
            data: transaction
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Fetching All Transactions",
            info: error.message
        })
    }
}