var qr = require('qr-image');
var fs = require('fs');

module.exports = {
  createQrCode: function(req, res, next) {
    var propertyId = req.params.id;
    var code = qr.image('http://guest-book.us/guest/' + propertyId, {type: 'png'});
    code.pipe(res);
  }
}