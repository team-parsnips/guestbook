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
    db.Booking.create({
      checkInDay: req.body.checkInDay,
      checkOutDay: req.body.checkOutDay,
      checkInTime: req.body.checkInTime,
      checkOutTime: req.body.checkOutTime,
      days: req.body.days,
      pricePaid: req.body.pricePaid,
      rating: req.body.rating,
    })
    .then(function(booking) {
      res.sendStatus(200);
    })
  },

  deleteBooking: function(req, res, next) {
    db.Booking.findOne({where: {id: req.params.id}})
    .then(function(deleteBooking) {
      deleteBooking.destroy();
      res.sendStatus(200);
    })
  },
  
  updateBooking: function(req, res, next) {
    var bookingId = req.params.id;
    var checkInTime = req.body.checkInTime;
    db.Booking.update({checkInTime: checkInTime}, {where: {id: bookingId}})
    .then(function(booking) {
      res.sendStatus(200);
    });
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