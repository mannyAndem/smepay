const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const User = require('../models/user')
const userCtrl = require('../controllers/user')


router.get('/smepay/users', userCtrl.getUsers)

router.get('/smepay/user/:userId', userCtrl.getUser)

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



// GOOGLE LOGIN
router.get('/auth/google', userCtrl.gglConsentScreen)

router.get('/auth/google/callback', 
    userCtrl.gglCallback, userCtrl.jsnWebToken)

router.get('/auth/google/success', 
    userCtrl.jsnValidateToken, userCtrl.onSuccess)

router.get('/auth/google/failure', userCtrl.onFailure)



module.exports = router;
