var axios = require('axios');

module.exports = {
  predictPrice: function(req, res, next) {
    axios.post('http://localhost:5000', {
      instant_book: true,
      satisfaction_guest: 98
    })
    .then(function(predicted) {
      console.log(predicted.data);
      res.send(predicted.data);
    });
  }
};
