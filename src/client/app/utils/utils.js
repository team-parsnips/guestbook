// returns month from date object
function getMonth(date) {
/*  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[date.getMonth()];*/
  return date.getMonth();
}

// returns week number (1-5) from date object
function getWeek(date) {
  return Math.ceil(date.getDate() / 7) - 1;
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