const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const passport = require('passport')


const User = require('../models/user')
const { json_secret } = require('../config/secret_keys')

const userDetailsFunc = (userParam, errMsg) => {
    if(!userParam){
        const error = new Error(errMsg)
        error.statusCode = 401
        throw error
    }
}

// USERS DETAILS
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        userDetailsFunc(users, "Users Not Found")
        res.status(200).json({
            message: "Successfully Fetched Users", 
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: "Error Getting Users",
            info: error.message
        })
    }

}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        // const user = await User.findById("64c22a054fd269c27a6ef043")

        userDetailsFunc(user, "User Not Found")
        res.status(200).json({message: "Successfully Fetched User", data: user})
    } catch (error) {
        res.status(500).json({
            message: "Error Getting User",
            info: error.message
        })
    }
}

// USERS ACTIONS
exports.signup = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error("Validation Failed")
        error.statusCode = 422
        error.data = errors.array()[0]
        throw error
    }

    const { fullname, email, password, confirmpass } = req.body
    // Not using confirm password field in model
    
    try {
        if(password != confirmpass){
            const error = 'Passwords do not match'
            error.statusCode = 422
            throw error
        }
        const hashpassword = await bcrypt.hash(password, 12)
        const user = new User({ fullname, email, password: hashpassword})

        const newUser = await user.save()
        res.status(201).json({message: `Successfully Signed up with email: ${newUser.email}`})

    } catch (error) {
        res.status(500).json({
            message: "Error Signing Up",
            info: error.message
        })
    }
}


exports.login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const oldUser = await User.findOne({ email })
        userDetailsFunc(oldUser, "Email does not exist in database, Please sign up!")

        const okPassword = await bcrypt.compare(password, oldUser.password)
        userDetailsFunc(okPassword, "Incorrect Password")

        const token = jwt.sign(
            {email: oldUser.email, userId: oldUser._id.toString()},
            json_secret, {expiresIn: '.25h'}) // signed in for 15 mins
        res.status(200).json({token: token, userId: oldUser._id.toString()})

    } catch (error) {
        res.status(500).json({
            message: "Error Login in",
            info: error.message
        })
    }
}

// diplay consentscreen using google api
exports.gglConsentScreen = passport.authenticate(
    'google', { scope: ['email', 'profile'] }
);

// setting up display for callback when a user clicks link sent to his/her mail
exports.gglCallback = passport.authenticate(
    'google', { 
        session: false, 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }
);


// signing user login via google to use token for verification    
exports.jsnWebToken = (req, res) => {
    console.log('here')
    jwt.sign(
        {user: req.user}, json_secret, {expiresIn: '.25'},
        (err, token) => {
            if(err){
                return res.status(500).json({token: null})
            }
            res.status(200).json({token, userId: req.user})
        })
        console.log('oops')
};

exports.jsnValidateToken = passport.authenticate(
    'jwt', { session: false});

exports.onSuccess = (req, res) => {
    console.log("You are now logged in")
    res.status(200).json({message: "Successfully signed in"})
}

exports.onFailure = (req, res) => {
    console.log("Login in Failed")
    res.status(500).json({message: "Error login in"})
}