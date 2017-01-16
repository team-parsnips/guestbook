import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import HomeIcon from 'material-ui/svg-icons/action/home';
import GraphIcon from 'material-ui/svg-icons/action/assessment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import LoginContainer from './loginContainer.jsx';

const socket = io();

const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

const homeIcon = <HomeIcon />;
const graphIcon = <GraphIcon />;
const settingsIcon = <SettingsIcon />;

const style = {
  margin: 12,
};

const mapStateToProps = function(store) {
  return {
    loggedIn: store.userState.loggedIn
  };
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    socket.emit('hostLogin', {hostId: 1});
    socket.on('user checked in', () => this.handleGuestCheckIn());
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleGuestCheckIn() {
    this.setState({
      open: true,
    });
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <LoginContainer />
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Tabs>
              <Tab
              label='MY PROPERTIES' value={0} icon={homeIcon}
              containerElement={<Link to='/properties'></Link>}/>
              <Tab
              label='MY ANALYTICS' value={1} icon={graphIcon}
              containerElement={<Link to='/analytics'></Link>}/>
              <Tab
              label='SETTINGS' value={2} icon={settingsIcon}
              containerElement={<Link to='/settings'></Link>}/>
            </Tabs>
            <div className='container'>
              {this.props.children}
              <Link to='/map'>Map</Link>
              <Link to='/camera'>Camera</Link>
            </div>
            <div>
              <Link to='/properties'>
                <RaisedButton label="Host" style={style} />
              </Link>
              <Link to='/guest'>
                <RaisedButton label="Guest" style={style} />
              </Link>
            </div>
            <Snackbar
              open={this.state.open}
              message="<A guest has checked into your property!"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose.bind(this)}
            />
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

export default connect(mapStateToProps)(Main);