import { combineReducers } from 'redux';

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

    case 'POPULATE_PROPERTIES':   
      return action.properties.map(property => {
        return {
        name: property.name,
        location: property.location  
        };
      });
    default:
      return state;
  }
};

const reducers = combineReducers({userState, propertyState});

export default reducers;