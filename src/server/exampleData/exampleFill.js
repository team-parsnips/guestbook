module.exports = function() {


var db = require('../db');
var Promise = require("bluebird");
var exampleUsers = require('./exampleUsers.js');
var exampleProperties = require('./exampleProperty.js');
var exampleBookings = require('./exampleBookings.js');
var exampleBookings2 = require('./exampleBookings2.js');

// begins chained functions to add users, properties, and bookings
var propertyId = 0;
// db.User.findAll()
// .then(function(users) {
//   console.log(users);
//   if (users.length < 1) {
//     addUsers();
//   }
// })
// .catch(function(err) {
//   console.err('Error checking DB to determine if self-population needed');
// });

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
  })
  .catch(function(err) {
    console.error('Error auto-adding users', err);
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
          price: property.price,
          predictedPrice: property.predictedPrice,
          personCapacity: property.personCapacity,
          location: property.location,
          checkInTime: property.checkInTime,
          checkOutTime: property.checkOutTime,
          photo: property.photo
        });
      });
    }, Promise.resolve())
  }).then(function() {
    addBookings();
  })
  .catch(function(err) {
    console.error('Error adding properties', err);
  });
}


// find property to attach bookings to
function addBookings() {
  db.Property.findOne()
  .then(function(property) {
    propertyId = property.id;
    // add all bookings
    return exampleBookings.reduce(function(promise, booking) {
      return promise.then(function() {
        return db.Booking.create({
        checkInDay: booking.checkInDay,
        checkOutDay: booking.checkOutDay,
        checkInTime: booking.checkInTime, 
        checkOutTime: booking.checkOutTime,
        days: booking.days,
        pricePaid: booking.pricePaid,
        rating: booking.rating,
        });
      });
    }, Promise.resolve())
  }).then(function() {
    addBookings2();
  })
  .catch(function(err) {
    console.error('Error adding bookings', err);
  });
}

// find 2nd property to attach bookings to
function addBookings2() {
  db.Property.findOne({where: {id: {$ne: propertyId}}})
  .then(function(property) {
    propertyId = property.id;
    // add all bookings
    return exampleBookings2.reduce(function(promise, booking) {
      return promise.then(function() {
        return db.Booking.create({
        checkInDay: booking.checkInDay,
        checkOutDay: booking.checkOutDay,
        checkInTime: booking.checkInTime, 
        checkOutTime: booking.checkOutTime,
        days: booking.days,
        pricePaid: booking.pricePaid,
        rating: booking.rating,
        PropertyId: propertyId
        });
      });
    }, Promise.resolve())
  })
  .catch(function(err) {
    console.error('Error adding bookings2', err);
  });
}
};