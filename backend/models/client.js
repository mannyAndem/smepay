const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String, 
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        address: {
            type: String, 
            required: true
        },
        category: {
            type: String,
            required: true
            // VIP or regular
        },
        status: {
            type: String,
            required: true
            // active or inactive
        },
        note: String,
        profile: {
            type: String,
            required: true
        }
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('Client', clientSchema)