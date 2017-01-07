var express = require('express');
var bookingRouter = express.Router();
var bookingController = require('../controllers/bookingController.js');

bookingRouter.get('/:id', bookingController.getBooking);
bookingRouter.post('/:id', bookingController.addBooking);
bookingRouter.delete('/:id', bookingController.deleteBooking);

module.exports = bookingRouter;