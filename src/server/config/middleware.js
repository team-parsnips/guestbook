var bodyParser = require('body-parser');
var morgan = require('morgan');

var bookingController = require('../controllers/bookingController.js');
var propertyController = require('../controllers/propertyController.js');


module.exports = function (app, express) {
  app.use(bodyParser.json());
  // app.use(morgan('dev'));

  app.get('/allData', [propertyController.loadAllProperties, 
                      bookingController.loadAllBookings],(req, res, next) => res.json(res.compoundData));

}