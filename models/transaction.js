const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transcationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String, 
            required: true
        },
        outstanding: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        details: [
            {   
                type: Schema.Types.ObjectId,
                ref: 'Invoice'
            }
        ]
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('Transaction', transcationSchema)