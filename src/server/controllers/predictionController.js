var axios = require('axios');

module.exports = {
  predictPrice: function(req, res, next) {
    axios({
      method: 'post',
      url: 'http://localhost:5000',
      timeout: 600000,
      data: {
        location: 'irvine',
        instant_book: 1,
        satisfaction_guest: 98,
        person_capacity: 2,
        rating_communication: 10,
        rev_count: 214,
        cancel_policy: 4,
        rating_cleanliness: 10,
        response_rate: 0.958, 
        rating_checkin: 10,
      }
    })
    .then(function(predicted) {
      console.log(predicted.data);
      res.send(predicted.data);
    });
  }
};
