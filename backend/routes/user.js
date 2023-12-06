const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const User = require('../models/user')
const userCtrl = require('../controllers/user')
const authMid = require('../config/auth')


router.get('/smepay/users', authMid, userCtrl.getUsers)

router.get('/smepay/user/:userId', authMid, userCtrl.getUser)

router.post('/smepay/signup', [
    body('email').isEmail().withMessage('Invalid email')
        .custom(async (notValid, { req }) => {
            const existingUser = await User.findOne({email: notValid})
            if(existingUser){
                return Promise.reject("A user with this email already exists")
            }
        }).normalizeEmail({
            gmail_remove_dots: false
        }),
    body('password').trim().isLength({min: 9})
        .withMessage("Password should be at least 9 characters"),
    body('fullname').trim().not().isEmpty()
        .withMessage("name cannnot be blank"),
],
userCtrl.signup);

router.post('/smepay/login', userCtrl.login);

router.post('/smepay/refresh', userCtrl.refreshToken);



// GOOGLE LOGIN
router.get('/auth/google', userCtrl.gglConsentScreen)

router.get('/auth/google/callback', 
    userCtrl.gglCallback, userCtrl.jsnWebToken)

router.get('/auth/google/success', 
    userCtrl.jsnValidateToken, userCtrl.onSuccess)

router.get('/auth/google/failure', userCtrl.onFailure)

// PASSWORD RESET
router.post('/user/reset-password', authMid, userCtrl.resetPassword)

// router.get('/user/email-redirect/?token', userCtrl.emailRedirect)
router.put('/user/new-password', authMid, userCtrl.newPassword)

module.exports = router;
