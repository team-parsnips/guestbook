var Sequelize = require('sequelize');

// To run in docker container/production mode - uncomment below
// Ensure mysql is NOT running (mysql.server stop)
// Run with 'docker-compose up' command in src directory

var db = new Sequelize('database', 'root', 'parsnips', {
  host: 'database',
  port: '3306'
});

// To run locally/development mode - uncomment below
// Ensure mysql is running (mysql.server start)
// Create 'guestbook' database
/*
var db = new Sequelize('guestbook', 'root', '');
*/

var User = db.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

var Property = db.define('Property', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  price: Sequelize.FLOAT,
  predictedPrice: Sequelize.FLOAT,
  checkInTime: Sequelize.STRING,
  checkOutTime: Sequelize.STRING,
  photo: Sequelize.TEXT
});

var Booking = db.define('Booking', {
  checkInDay: Sequelize.DATE,
  checkOutDay: Sequelize.DATE,
  checkInTime: Sequelize.DATE, 
  checkOutTime: Sequelize.DATE,
  days: Sequelize.INTEGER,
  pricePaid: Sequelize.FLOAT,
  rating: Sequelize.INTEGER
});

Property.belongsTo(User);
Booking.belongsTo(Property);

User.sync();
Property.sync();
Booking.sync();

// creates these tables in MySQL if they don't already exist. Pass in {force: true}

exports.User = User;
exports.Property = Property;
exports.Booking = Booking;