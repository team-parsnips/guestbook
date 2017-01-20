import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './modules/routes';
import reducers from './modules/reducers';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducers);

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes(store)}
        </Router>
      </Provider>
    );
  }
}

injectTapEventPlugin();
render(<App/>, document.getElementById('app'));