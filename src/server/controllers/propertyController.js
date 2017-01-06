module.exports = {
  getProperty: function(req, res, next) {
    res.send({message: 'getting property ' + req.params.id});
  },
  addProperty: function(req, res, next) {
    res.send({message: 'adding property ' + req.params.id});
  }
}