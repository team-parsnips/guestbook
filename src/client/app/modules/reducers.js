import { combineReducers } from 'redux';

const userReducers = (state = {}, action) => {
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

const propertyReducers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROPERTY':
      return [...state, {
        index: action.property.index,
        address: action.property.address
      }];

    default:
      return state;
  }
};

const reducers = combineReducers({userReducers, propertyReducers});

export default reducers;