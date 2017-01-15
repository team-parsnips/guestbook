export const signIn = (user) => {
  return {
    type: 'USER_SIGNIN',
    user: user,
    loggedIn: true
  }
}

export const addProperty = (property) => {
  return {
    type: 'ADD_PROPERTY',
    property
  }
}

export const deleteProperty = (property) => {
  return {
    type: 'DELETE_PROPERTY',
    property
  }
}

export const populateProperties = (properties) => {
  return {
    type: 'POPULATE_PROPERTIES',
    properties
  }
}

export const populateBookings = (bookings) => {
  return {
    type: 'POPULATE_BOOKINGS',
    bookings
  }
}

export const checkIn = (booking) => {
  return {
    type: 'GUEST_CHECKIN', 
    booking
    // checkInTime: new Date(),
    // checkedIn: true,

  }
}