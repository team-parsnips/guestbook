import { combineReducers } from 'redux';
import update from 'react-addons-update';

const userState = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return Object.assign({}, state, {
        user: action.user,
        loggedIn: true
      });

    default:
      return state;
  }
};

const propertyState = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROPERTY':
      return [...state, {
        name: action.property.name,
        location: action.property.location
      }];
    case 'DELETE_PROPERTY':
      return state.filter(property => (property.id !== action.property.id));
    case 'POPULATE_PROPERTIES':   
      return action.properties;
    default:
      return state;
  }
};

const bookingState = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_BOOKINGS':
      return action.bookings;
    case 'GUEST_CHECKIN':
      return state.map((booking) => {
        if (booking.id === action.booking.id) {
          return action.booking;
        } else {
          return booking;
        }
      });
    default:
      return state;

  }
};

const reducers = combineReducers({userState, propertyState, bookingState});

export default reducers;