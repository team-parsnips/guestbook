var express = require('express');
var path = require('path');
var app = express();

require('./config/middleware.js')(app, express);

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

var port = (process.env.PORT || 4000);
app.listen(port, function() {
  console.log('Guestbook is listening at', port);
})