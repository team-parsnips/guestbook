import React from 'react';
import {match, Route, IndexRoute, browserHistory} from 'react-router';
import Main from '../components/Main.jsx';
import Properties from '../components/properties/propertiesContainer.jsx';
import Analytics from '../components/analytics/analytics.jsx';
import MapContainer from '../components/map/mapContainer.jsx';
import CameraContainer from '../components/camera/cameraContainer.jsx';
import Guest from '../components/guest/guest.jsx';
import Splash from '../components/Splash.jsx';
import Settings from '../components/settings/settings.jsx';

export default (store) => (
  <div>
  <Route component={Main} onEnter={() => requireAuth(store)}>
    <Route path='/properties' component={Properties} />
    <Route path='/analytics' component={Analytics} />
    <Route path='/map' component={MapContainer} />
    <Route path='/settings' component={Settings} />
  </Route>
    <Route path='/' component={Splash} />
    <Route path='/guest' component={Guest} />
    <Route path='/camera' component={CameraContainer} />
  </div>
);

// checks store for authenticated state
const requireAuth = (store) => {
  var state = store.getState();
  if (!state.userState.loggedIn) {
    browserHistory.push('/');
  }
}