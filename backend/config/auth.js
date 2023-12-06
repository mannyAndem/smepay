const jwt = require("jsonwebtoken")

const { json_secret } = require('./secret_keys')

module.exports = async (req, res, next) => {
    const header = req.get("Authorization")
    if(!header){
        const error = new Error("No headers found")
        error.statusCode = 401
        throw error
    }

    // confirm token coming from the logged in user and grant access
    const token = header.split(" ")[1]
    let decodedtoken;
    try {
        decodedtoken = await jwt.verify(token, json_secret)
        // decoding token which is an encryption of studentemail, studentid
        // and json_secret, and verifying this with the json_secret
    } catch (error) {
        // const error = new Error("")
        error.statusCode = 500
        throw error
    }

    // denying access to user if no token found
    if(!decodedtoken){
        const error = new Error("Unauthorized Access")
        error.statusCode = 401
        throw error
    }
    req.userId = decodedtoken.userId
    // hence I can always access the id of the currently logged in
    // user via req.userId anytime a request is sent
    next() //to reach the next middleware (controller)
}