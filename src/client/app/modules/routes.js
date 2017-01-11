import React from 'react';
import {match, Route, IndexRoute } from 'react-router';
import Main from '../components/Main.jsx';
import Properties from '../components/properties/propertiesContainer.jsx';
import Analytics from '../components/analytics/analytics.jsx';
import MapContainer from '../components/map/mapContainer.jsx';

module.exports = (
  <Route path='/' component={Main}>
    <Route path='/properties' component={Properties} />
    <Route path='/analytics' component={Analytics} />
    <Route path='/map' component={MapContainer} />
  </Route>

);
    // <Route path='/settings' component={Settings} />