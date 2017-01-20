var express = require('express');
var qrCodeRouter = express.Router();
var qrCodeController = require('../controllers/qrCodeController.js');

qrCodeRouter.get('/:id', qrCodeController.createQrCode);

module.exports = qrCodeRouter;