var db = require('../db');
var Promise = require("bluebird");
var exampleUsers = require('./exampleUsers.js');
var exampleProperties = require('./exampleProperty.js');
var exampleBookings = require('./exampleBookings.js');

// begins chained functions to add users, properties, and bookings
addUsers();

// add all users
function addUsers() {
  exampleUsers.reduce(function(promise, user) {
    return promise.then(function() {
      return db.User.create({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });
  }, Promise.resolve()).then(
  function() {
    addProperties();
  });
}


// finds user to attach properties to
function addProperties() {
  db.User.findOne()
  .then(function(user) {
    var userId = user.id;
    // add all properties to found user
    return exampleProperties.reduce(function(promise, property) {
      return promise.then(function() {
        return db.Property.create({
          UserId: userId,
          name: property.name,
          location: property.location,
          checkInTime: property.checkInTime,
          checkOutTime: property.checkOutTime
        });
      });
    }, Promise.resolve())
  }).then(function() {
    addBookings();
  })
}


// find property to attach bookings to
function addBookings() {
  db.Property.findOne()
  .then(function(property) {
    var propertyId = property.id;
    // add all bookings
    exampleBookings.reduce(function(promise, booking) {
      return promise.then(function() {
        return db.Booking.create({
        checkInDay: booking.checkInDay,
        checkOutDay: booking.checkOutDay,
        days: booking.days,
        pricePaid: booking.pricePaid,
        rating: booking.rating,
        PropertyId: propertyId
        });
      });
    }, Promise.resolve())
  });
}

