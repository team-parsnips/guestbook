var express = require('express');
var predictionRouter = express.Router();
var predictionController = require('../controllers/predictionController.js');

predictionRouter.post('/', predictionController.predictPrice);

module.exports = predictionRouter;