import React from 'react';
import {match, Route, IndexRoute } from 'react-router';
import Main from '../components/Main.jsx';
import Properties from '../components/properties/propertiesContainer.jsx';
import Analytics from '../components/analytics/analytics.jsx';
import MapContainer from '../components/map/mapContainer.jsx';
import CameraContainer from '../components/camera/cameraContainer.jsx';
import Guest from '../components/guest/guest.jsx';
import Splash from '../components/Splash.jsx';


module.exports = (
  <div>
  <Route component={Main}>
    <Route path='/properties' component={Properties} />
    <Route path='/analytics' component={Analytics} />
    <Route path='/map' component={MapContainer} />
  </Route>
    <Route path='/' component={Splash} />
    <Route path='/camera' component={CameraContainer} />
    <Route path='/guest' component={Guest} />
  </div>
);
