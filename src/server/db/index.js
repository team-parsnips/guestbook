var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

var User = db.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

var Property = db.define('Property', {
  userId: { Sequelize.INTEGER, unique: true }
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  checkInTime: Sequelize.STRING,
  checkOutTime: Sequelize.STRING,
});

var Booking = db.define('Booking', {
  checkInDay: Sequelize.STRING,
  checkOutDay: Sequelize.STRING,
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
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.Property = Property;
exports.Booking = Booking;