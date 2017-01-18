var Sequelize = require('sequelize');
var db = new Sequelize('guestbook', 'root', '', {
/*  host: 'localhost',
  host: '0.0.0.0',
  port: '3306'*/
});

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