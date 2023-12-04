const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema(
    {
        recipientEmail: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        issuedDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        billFrom: {
            type: String,
            required: true
        },
        billTo: {
            type: String,
            required: true
        },
        status: {
            type: String, 
            default: 'pending'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        totalAmount: {
            type: Number,
            default: 0
        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('Invoice', invoiceSchema)