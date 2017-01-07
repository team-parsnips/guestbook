var db = require('../db');

module.exports = {
  getProperty: function(req, res, next) {
    db.Property.findOne({id: req.params.id}) //TODO: change id to propertyId to match schema
    .then(function(property) {
      res.send(property);
    });
  },

  addProperty: function(req, res, next) {
    db.Property.create({
      UserId: req.params.UserId,
      name: req.body.name,
      location: req.body.location,
      checkInTime: req.body.checkInTime,
      checkOutTime: req.body.checkOutTime
    }).then(function(property) {
      res.sendStatus(201);
    });
  },
  
  getAllProperty: function(req, res, next) {
    db.Property.findAll()
    .then(function(properties) {
      res.send(properties);
    });
  }
}