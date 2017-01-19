var axios = require('axios');

module.exports = {
  predictPrice: function(req, res, next) {
    var airbnbAdd = req.body.location;
    var personCap = parseInt(req.body.personCapacity);
    console.log('airbnbAdd', airbnbAdd);
    console.log('personCapacity', personCap);
    axios({
      method: 'post',
      url: '172.20.0.2:5000',
      timeout: 600000,
      data: {
        location: airbnbAdd,
        instant_book: 1,
        satisfaction_guest: 98,
        person_capacity: personCap,
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
