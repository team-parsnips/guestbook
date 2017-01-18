var bodyParser = require('body-parser');
var morgan = require('morgan');

var bookingController = require('../controllers/bookingController.js');
var propertyController = require('../controllers/propertyController.js');


module.exports = function (app, express) {
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });
  
  app.get('/allData', [propertyController.loadAllProperties, 
                      bookingController.loadAllBookings],(req, res, next) => res.json(res.compoundData));

}