var db = require('../db');

module.exports = {
  getBooking: function(req, res, next) {
    console.log('getting booking');
    var propertyId = req.params.id;
    db.Booking.findAll({where: {PropertyId: propertyId}})
    .then(function(bookings) {
      res.send(bookings);
    });
  },
  addBooking: function(req, res, next) {

  },
  deleteBooking: function(req, res, next) {

  }
}