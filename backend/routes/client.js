const express = require('express')
const router = express.Router();

const { body } = require('express-validator')
const clientCtrl = require('../controllers/client')
const authMid = require('../config/auth')


// -- CLIENTS --
router.post('/client/add', [
    body('name').not().isEmpty()
        .withMessage("Name cannot be blank"),
    body('email').isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail({
            gmail_remove_dots: false
        }),
    body('address').not().isEmpty()
        .withMessage('Address cannot be blank'),
    body('category').not().isEmpty()
        .withMessage('Category cannot be empty'),
    body('status').not().isEmpty()
        .withMessage('Status cannot be empty'),
    body('number').isNumeric()
        .withMessage('phone number must be numeric'),
], authMid, clientCtrl.addClient);

router.get('/client/:clientId', authMid, clientCtrl.getClient);

router.get('/clients', authMid, clientCtrl.fetchClients);



// -- INVOICE --
router.post('/invoice/create', [
    body('recipientEmail').isEmail()
        .withMessage("Invalid Email")
        .normalizeEmail({
            gmail_remove_dots: false
        }),
    body('description').not().isEmpty()
        .withMessage("Descriptioin cannot be blank"),
    body('issuedDate').isISO8601().toDate()
        .withMessage('Invalid Date'),
    body('dueDate').isISO8601().toDate()
        .withMessage('Invalid Date'),
    body('billFrom').not().isEmpty()
        .withMessage('billFrom cannot be empty'),
    body('billTo').not().isEmpty()
        .withMessage('billTo cannot be empty'),
// ], authMid, clientCtrl.createInvoice);
], clientCtrl.createInvoice);

router.post('/paystack/initiate/:transactionId', authMid, clientCtrl.initiatePayment);

router.post('/paystack/verify', authMid, clientCtrl.verifyPayment);


router.get('/invoice/:invoiceId', authMid, clientCtrl.getInvoice);

router.get('/invoice', authMid, clientCtrl.fetchInvoice);



// -- ITEMS --
router.post('/item/add/:invoiceId', [
    body('name').not().isEmpty()
        .withMessage('name cannot be blank'),
    body('price').isNumeric()
        .withMessage("Price must be numeric"),
    body('qty').isNumeric()
        .withMessage("Quantity must be numeric")
], authMid, clientCtrl.addItem);
// ], clientCtrl.addItem);

router.get('/item/:itemId', authMid, clientCtrl.getItem);

router.get('/items/:invoiceId', authMid, clientCtrl.fetchItems);



// -- TRANSACTIONS --
router.get('/transaction/:transactionId', authMid, clientCtrl.getTransaction);

router.get('/transactions', authMid, clientCtrl.fetchTransactions);



module.exports = router;