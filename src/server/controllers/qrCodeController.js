var qr = require('qr-image');
var fs = require('fs');

module.exports = {
  createQrCode: function(req, res, next) {
    var code = qr.image('http://www.github.com', {type: 'png'});
    code.pipe(res);
  }
}