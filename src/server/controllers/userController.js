var db = require('../db');

module.exports = {
  login: function(req, res, next) {
    db.User.findOne({email: req.body.email})
      .then(function(user) {
        res.send('Welcome, ' + user.firstName);
      });
  },
  register: function(req, res, next) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(function(user) {
      res.sendStatus(201);
    });
  }
}