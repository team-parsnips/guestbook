var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var userRouter = require('./routers/userRouter.js');
var propertyRouter = require('./routers/propertyRouter.js');
var bookingRouter = require('./routers/bookingRouter.js');
var qrCodeRouter = require('./routers/qrCodeRouter.js');

// configure middleware
require('./config/middleware.js')(app, express);

// setup routers for users, property, and bookings
app.use('/', userRouter);
app.use('/property', propertyRouter);
app.use('/booking', bookingRouter);
app.use('/qrCode', qrCodeRouter);

// setup to serve static files
app.use('/', express.static(path.join(__dirname, '../client')));

// general redirect for full client side rendering of pages
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

// add connection listener
io.on('connection', function(socket){
  console.log('a user connected');
});


var port = (process.env.PORT || 4000);
server.listen(port, function(){
  console.log('listening on *:4000');
});

// app.listen(port, function() {
//   console.log('Guestbook is listening at', port);
// })

