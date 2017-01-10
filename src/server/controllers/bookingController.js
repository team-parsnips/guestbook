var db = require('../db');

module.exports = {
  getBooking: function(req, res, next) {
    var propertyId = req.params.id;
    db.Booking.findAll({where: {PropertyId: propertyId}})
    .then(function(bookings) {
      res.send(bookings);
    });
  },
  addBooking: function(req, res, next) {

  },
  deleteBooking: function(req, res, next) {

  },

  loadAllBookings: function(req, res, next) {
    db.Booking.findAll()
    .then(function(bookings) {
      res.compoundData['bookings'] = bookings;
      next();
    })
    .catch(function(err) {
      console.error('Error loading all bookings', err);
    });
  }
}