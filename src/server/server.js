var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var socketHandler = require('./socketHandler.js');

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

// add listeners when connection is open
io.sockets.on('connection', function (socket) {

  socket.on('hostLogin', function(data) {
    socket.id = data.hostId;
  });

  socket.on('checkIn', function (data) {
    socket.to(socket.id).emit("user checked in");   
  });

});
// io.on('connection', function(socket) {
//   console.log('socket id', socket.id);
//   // socket.to('checkin', (msg) => console.log('message', msg))
// });

var port = (process.env.PORT || 4000);

http.listen(port, function() {
  console.log('Guestbook is listening at', port);
});