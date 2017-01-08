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
      UserId: req.body.UserId,
      name: req.body.name,
      location: req.body.location,
      checkInTime: req.body.checkInTime,
      checkOutTime: req.body.checkOutTime
    }).then(function(property) {
      res.sendStatus(201);
    });
  },

  getAllProperties: function(req, res, next) {
    // db.Property.findAll({include: [db.User]})
    console.log(req);
    db.Property.findAll({limit: 50})
    .then(function(properties) {
      console.log(properties);
      res.send(properties);
    });
  }
}

