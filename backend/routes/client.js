const express = require('express')
const router = express.Router();

const clientCtrl = require('../controllers/client')

router.post('/addclient', clientCtrl.addClient);

// -- INVOICE --
router.put('/invoice/create', clientCtrl.createInvoice);

router.get('/invoice/:invoiceId', clientCtrl.getInvoice);

router.get('/invoice', clientCtrl.fetchInvoice);

// -- ITEMS --
router.put('/item/add/:invoiceId', clientCtrl.addItem);

router.get('/item/:itemId', clientCtrl.getItem);

router.get('/items', clientCtrl.fetchItems);

module.exports = router;