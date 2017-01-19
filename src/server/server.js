var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');

// var socketHandler = require('./socketHandler.js');
var userRouter = require('./routers/userRouter.js');
var propertyRouter = require('./routers/propertyRouter.js');
var bookingRouter = require('./routers/bookingRouter.js');
var qrCodeRouter = require('./routers/qrCodeRouter.js');
var predictionRouter = require('./routers/predictionRouter');

// setup to serve static files
app.use('/', express.static(path.join(__dirname, '../client')));

// configure middleware
require('./config/middleware.js')(app, express);

// setup routers for users, property, and bookings
app.use('/', userRouter);
app.use('/property', propertyRouter);
app.use('/booking', bookingRouter);
app.use('/qrCode', qrCodeRouter);
app.use('/predict', predictionRouter);

/*app.get('/auth', function(req, res) {
  res.send(token);
});*/

// general redirect for full client side rendering of pages
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

//add listeners when connection is open
io.on('connection', function (socket) {
  console.log('socket connection opened!');

  socket.on('hostLogin', function(data) {
    console.log('got host login')
    // join hosts room
    socket.join('hosts');
  });

  socket.on('check in', function (data) {
    console.log('got guest check in')
    socket.broadcast.emit('guest checked in', {propertyName: data.propertyName});  
    // io.to('hosts').emit('user checked in')
  });

});

var port = (process.env.PORT || 4000);

http.listen(port, function() {
  console.log('Guestbook is listening at', port);
});

