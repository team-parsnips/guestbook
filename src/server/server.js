var express = require('express');
var path = require('path');
var app = express();

var userRouter = require('./routers/userRouter.js');
var propertyRouter = require('./routers/propertyRouter.js');

// configure middleware
require('./config/middleware.js')(app, express);

// setup routers for users and property
app.use('/', userRouter);
app.use('/property', propertyRouter);

// setup to serve static files
app.use('/public', express.static(path.join(__dirname, '../client/public')));

// general redirect for full client side rendering of pages
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

var port = (process.env.PORT || 4000);
app.listen(port, function() {
  console.log('Guestbook is listening at', port);
})