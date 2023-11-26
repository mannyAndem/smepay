const express = require('express')
const router = express.Router();

const clientCtrl = require('../controllers/client')


// -- CLIENTS --
router.post('/client/add', clientCtrl.addClient);

router.get('/client/:clientId', clientCtrl.getClient);

router.get('/clients', clientCtrl.fetchClients);


// -- INVOICE --
router.post('/invoice/create', clientCtrl.createInvoice);

router.get('/invoice/:invoiceId', clientCtrl.getInvoice);

router.get('/invoice', clientCtrl.fetchInvoice);

// -- ITEMS --
router.post('/item/add/:invoiceId', clientCtrl.addItem);

router.get('/item/:itemId', clientCtrl.getItem);

router.get('/items', clientCtrl.fetchItems);

// -- TRANSACTIONS --
router.post('/transaction/generate', clientCtrl.generateTransaction);

router.get('/transaction/:transactionId', clientCtrl.getTransaction);

router.get('/transactions', clientCtrl.fetchTransactions);



module.exports = router;