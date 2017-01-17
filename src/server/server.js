var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// var socketHandler = require('./socketHandler.js');
var token = undefined;

var userRouter = require('./routers/userRouter.js');
var propertyRouter = require('./routers/propertyRouter.js');
var bookingRouter = require('./routers/bookingRouter.js');
var qrCodeRouter = require('./routers/qrCodeRouter.js');

// setup to serve static files
app.use('/', express.static(path.join(__dirname, '../client')));

// configure middleware
require('./config/middleware.js')(app, express);

// setup routers for users, property, and bookings
app.use('/', userRouter);
app.use('/property', propertyRouter);
app.use('/booking', bookingRouter);
app.use('/qrCode', qrCodeRouter);

app.get('/auth', function(req, res) {
  res.send(token);
});

// general redirect for full client side rendering of pages
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

//add listeners when connection is open
// io.sockets.on('connection', function (socket) {
io.on('connection', function (socket) {
  // customize socket id to be 
  console.log('socket connection opened!');

  socket.on('hostLogin', function(data) {
    console.log('got host login')
    socket.join('hosts');
    // console.log('socket id before', socket.id);
    // socket.id = data.hostId;
    // console.log('socket id after', socket.id);
  });

  socket.on('checkIn', function () {
    console.log('got check in')
    // io.to(socket.id).emit("user checked in"); 
    socket.broadcast.emit('user checked in');  
    // io.to('hosts').emit('user checked in')
  });

});

var port = (process.env.PORT || 4000);

http.listen(port, function() {
  console.log('Guestbook is listening at', port);
});

