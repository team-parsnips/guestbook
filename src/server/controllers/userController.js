var db = require('../db');

module.exports = {

  // login user based on email/password
  login: function(req, res, next) {
    db.User.findOne({where: {email: req.body.email}})
    .then(function(user) {
      // successful matching of email/password returns found user
      if (user.password === req.body.password) {
        res.send(user);
      } else {
        res.send({error: 'PASSWORD', message: 'This combination does not match our records'});
      }
    })
    .catch(function(err) {
      res.send({error: 'USERNAME', message: 'This email does not exist within our records.'})
    })
  },

  fbLogin: function(req, res, next) {
    db.User.findOne({where: {email: req.body.email}})
    .then(function(user) {
      // in case user doesn't exist, create it and return it
      if(!user) {
        db.User.create({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })
        .then(function(user) {
          res.send(user);
        })
      } else {
        // for the case user exists, return found user
        res.send(user);
      }
    })
    .catch(function(err) {
      console.log(err);
    })
  },

  register: function(req, res, next) {
    console.log(req.body.email);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(function(user) {
      res.send({message: 'Registered new user.'});
    })
    .catch(function(err) {
      res.send({message: 'Sorry, this user already exists.'})
    })
  }
}