import React from 'react';
import {match, Route, IndexRoute } from 'react-router';
import Main from '../components/Main.jsx';
import Properties from '../components/properties/propertiesContainer.jsx';

module.exports = (
  <Route path='/' component={Main}>
    <Route path='/properties' component={Properties} />
  </Route>

);
    // <Route path='/analytics' component={Analytics} />
    // <Route path='/settings' component={Settings} />