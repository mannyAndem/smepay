const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        google: {
            id: {
                type: String
            },
            email: {
                type: String
            },
            name: {
                type: String
            },
        },
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String, 
            required: true
        },
        password: {
            type: String, 
            required: true
        },
        token: String,
        tokenExp: Date,
        clients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Client'
            }
        ]
    },
    { 
        timestamps: true 
    }
)

module.exports = mongoose.model('User', userSchema)