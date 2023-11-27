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
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        totalAmount: {
            type: Number
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('Invoice', invoiceSchema)