module.exports = {
  login: function(req, res, next) {
    res.send({message:'logging in'});
  },
  register: function(req, res, next) {
    res.send({message: 'registering'});
  }
}