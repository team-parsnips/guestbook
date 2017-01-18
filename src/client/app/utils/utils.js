import axios from 'axios';

// returns month (0-11) from date string
function getMonth(dateString) {
/*  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[date.getMonth()];*/
  var date = new Date(dateString);
  return date.getMonth();
}

// returns week number (1-5) from date string
function getWeek(dateString) {
  var date = new Date(dateString);
  return Math.ceil(date.getDate() / 7) - 1;
}

// retrieves all bookings stored in db
export const getBookings = (cb1, cb2) => {
  //TODO: change bookingID after running examlpleFill.js
  axios.get('/booking/' + 1)
  .then(function(response) {
    cb2(cb1(response.data));
  });
}

// retrieves bookings for stacked grouped bar - Emerson's DB
export const getBookings1 = (cb1, cb2) => {
  axios.get('/booking/' + 1)
  .then(function(response) {
    cb2(cb1(response.data));
  });
}

export const getBookings2 = (cb1, cb2) => {
  axios.get('/booking/' + 2)
  .then(function(response) {
    cb2(cb1(response.data));
  });
}

// populates hierarchical data structure based on bookings
export const bookingMap = (bookings) => {
  var flare = window.flare;
  bookings.map((booking) => {
    var month = getMonth(booking.checkOutDay);
    var week = getWeek(booking.checkOutDay);
    if (month >= 5 && month <= 7) {
      flare.children[0].children[month - 5].children[week].size++;
    } else if (month >= 8 && month <= 10) {
      flare.children[1].children[month - 8].children[week].size++;
    } else if (month === 11 || month === 0 || month === 1) {
      if (month === 11) {
        var winterMonth = 0;
      } else if (month === 0) {
        var winterMonth = 1;
      } else if (month === 1) {
        var winterMonth = 2;
      }
      flare.children[2].children[winterMonth].children[week].size++;
    } else if (month >= 2 && month <= 4) {
      flare.children[3].children[month - 2].children[week].size++;
    }
  });
  return flare;
}


// populates pie chart data structure based on bookings
export const bookingPie = (bookings) => {
  var mappedBookings = {};
  bookings.map((booking) => {
    if (mappedBookings[booking.days]) {
      mappedBookings[booking.days]++;
    } else {
      mappedBookings[booking.days] = 1;
    }
  });
  var result = [];
  for (var mappedBooking in mappedBookings) {
    var dataPoint = {
      durationOfStay: mappedBooking,
      freq: mappedBookings[mappedBooking]
    };
    result.push(dataPoint);
  }
  return result;
}

export const stackedRevenueBar = (bookings) => {
  var dataSet = {
    'x-ticks': 12,
    'x-axis': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    'data': {}
  };
  bookings.forEach(booking => {
    let month = getMonth(booking.checkOutDay);
    if (dataSet.data['Property' + booking.PropertyId] === undefined) {
      dataSet.data['Property' + booking.PropertyId] = new Array(12).fill(0);
    }
    dataSet.data['Property' + booking.PropertyId][month] += booking.pricePaid;
  });

  return dataSet;
}

// populates data for scatter plot
export const bookingTimeMap = (bookings) => {
  var bookingArr = [];
  bookings.map((booking) => {
    var bookingDetails = {};
    bookingDetails.checkInTime = new Date(booking.checkInTime);
    bookingDetails.checkOutTime = new Date(booking.checkOutTime);
    bookingArr.push(bookingDetails); 
  });
  return bookingArr;
}
