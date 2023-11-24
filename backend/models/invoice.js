const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema(
    {
        number: {
            type: String,
            required: true
        },
        clientname: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        duedate: {
            type: Date,
            required: true
        },
        status: {
            type: String, 
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        method: {
            type: Number,
            required: true
        },
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('Invoice', invoiceSchema)