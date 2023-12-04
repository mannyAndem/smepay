const https = require('https')
const axios = require('axios')

const { paystack_public_key, paystack_secret_key } = require('./secret_keys')

exports.acceptPayment = async (req, res) => {
    const { email, amount } = req.body
    const params = JSON.stringify({ "email": email, 
    "amount": amount * 100 })

    try {
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
        const request = https.request(options, apiRes => {
            let data = ''
            apiRes.on('data', chunk => {
                data += chunk
            })
            apiRes.on('end', () => {
                console.log(JSON.parse(data))
                return res.status(200).json(data)
            })
        }).on('error', err => {
            console.log(err)
            return res.status(400).json(err)
        })

        request.write(params)
        request.end()    

    } catch (err) {
        console.log(err)
        res.status(500).json({error: `An error occured: ${err.message}`})
    }
    
}

exports.verifyPayment = async (req, res) => {
    const { reference } = req.query
    try {
        const options = {
            hostname: 'api.paystack.co',
            port: 5000,
            path: `/transaction/verify/${encodeURIComponent(reference)}`,
            method: 'GET',
            headers: { 
                Authorization: paystack_public_key,
                'Content-type': 'application/json',
            }
        }

        const request = await axios(options)
        if(!request){
            const error = new Error("Error verifyinig payment")
            error.statusCode = 402
            throw error
        }

        const value = request.data
        // bring switch statments here
        return res.statsu(200).json(value)

    } catch (err) {
        console.log(err)
        res.status(500).json({error: `An error occured: ${err.message}`})
    }
}

exports.webhook = async (req, res) => {
    const { event } = req.body;
    try {
        switch (event.event) {
            case "charge.success":
                return res.status().json({
                    message: "Successfully Made Payment",
                    info: event.data
                })
            case "charge.failed":
                return res.status().json({
                    message: "Failed to Make Payment",
                    info: event.data
                })
        
            default:
                res.status().json({ message: "Unhandled Event" })
                break;
        }
        res.sendStatus(200)
    } catch (err) {
        res.status(400).json({
            message: "Error Verifyinig Webhook Event",
            info: err.message
        })
    }
}