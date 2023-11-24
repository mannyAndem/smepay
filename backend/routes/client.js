const express = require('express')
const router = express.Router();

const clientCtrl = require('../controllers/client')

router.post('/addclient', clientCtrl.addClient);

module.exports = router;