var express = require('express');
var propertyRouter = express.Router();
var propertyController = require('../controllers/propertyController.js');

propertyRouter.get('/:id', propertyController.getProperty);
propertyRouter.post('/:id', propertyController.addProperty);
propertyRouter.get('/all', propertyController.getAllProperties);


module.exports = propertyRouter;