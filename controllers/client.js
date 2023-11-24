const User = require('../models/user')
const Invoice = require('../models/invoice')
const Item = require('../models/item')


const notInDB = (data, errMsg) => {
    if(!data){
        const error = new Error(errMsg)
        error.statusCode = 401
        throw error
    }
}

exports.addClient = async (req, res, next) => {
    //
}

// -- INVOICE --
exports.getInvoice = async (req, res) => {
    const { invoiceId } = req.params

    try {
        const invoice = await Invoice.findById(invoiceId)
        notInDB(invoice, "Invoice Not Found")
        
        res.status(200).json({
            message: "Successfully Fetched All Invoice",
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

exports.createInvoice = async (req, res) => {
    const { recipientEmail, description, issuedDate, 
        dueDate, billFrom, billTo } = req.body
    try {
        const user = await User.findById(req.userId)
        notInDB('user',)

        const invoice = new Invoice({
            recipientEmail, description, issuedDate, 
            dueDate, billFrom, billTo
        })
        await invoice.save()

        user.invoice.push(invoice)
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




// -- ITEMS --
exports.addItem = async (req, res) => {
    const { invoiceId } = req.params
    const { name, price, qty } = req.body
    try {
        const user = await User.findById(req.userId)
        notInDB(user, "User Not Found")

        const invoice = Invoice.findById(invoiceId)
        notInDB(invoice, "Invoice Not Found")
        
        const item = new Item({ name, price, qty })

        invoice.items.push(item)
        const updatedInvoice = await invoice.save()

        user.invoice.pus(updatedInvoice)
        await user.save()

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
        const item = await Item.findById(itemId)
        notInDB(item, "Couldn't Find Itme")
        
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