import React from 'react';
import {match, Route, IndexRoute, browserHistory} from 'react-router';
import Main from '../components/Main.jsx';
import Properties from '../components/properties/propertiesContainer.jsx';
import Analytics from '../components/analytics/analytics.jsx';
import MapContainer from '../components/map/mapContainer.jsx';
import Guest from '../components/guest/guest.jsx';
import Splash from '../components/Splash.jsx';

export default (store) => (
  <div>
  <Route component={Main} onEnter={() => requireAuth(store)}>
    <Route path='/properties' component={Properties} />
    <Route path='/analytics' component={Analytics} />
    <Route path='/map' component={MapContainer} />
  </Route>
    <Route path='/' component={Splash} />
    <Route path='/guest/:id' component={Guest} />
  </div>
);

// checks store for authenticated state
const requireAuth = (store) => {
  var state = store.getState();
  if (!state.userState.loggedIn) {
    browserHistory.push('/');
  }
}