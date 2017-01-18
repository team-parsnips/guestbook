var qr = require('qr-image');
var fs = require('fs');

module.exports = {
  createQrCode: function(req, res, next) {
    var propertyId = req.params.id;
    var code = qr.image('http://robocop.local:4000/guest/' + propertyId, {type: 'png'});
    code.pipe(res);
  }
}