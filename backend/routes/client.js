const express = require('express')
const router = express.Router();

const clientCtrl = require('../controllers/client')
const authMid = require('../config/auth')


// -- CLIENTS --
router.post('/client/add', authMid, clientCtrl.addClient);

router.get('/client/:clientId', authMid, clientCtrl.getClient);

router.get('/clients', authMid, clientCtrl.fetchClients);


// -- INVOICE --
router.post('/invoice/create', authMid, clientCtrl.createInvoice);

router.get('/invoice/:invoiceId', authMid, clientCtrl.getInvoice);

router.get('/invoice', authMid, clientCtrl.fetchInvoice);

// -- ITEMS --
router.post('/item/add/:invoiceId', authMid, clientCtrl.addItem);

router.get('/item/:itemId', authMid, clientCtrl.getItem);

router.get('/items/:invoiceId', authMid, clientCtrl.fetchItems);

// -- TRANSACTIONS --
router.get('/transaction/:transactionId', authMid, clientCtrl.getTransaction);

router.get('/transactions', authMid, clientCtrl.fetchTransactions);



module.exports = router;