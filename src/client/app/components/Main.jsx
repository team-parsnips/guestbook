import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import HomeIcon from 'material-ui/svg-icons/action/home';
import GraphIcon from 'material-ui/svg-icons/action/assessment';


import LoginContainer from './loginContainer.jsx';
import Logout from './logout/logout.jsx';

const socket = io();

const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

// const homeIcon = <FontIcon className="material-icons">home</FontIcon>;
// const graphIcon = <FontIcon className="material-icons">graph</FontIcon>;
// const nearbyIcon = <IconLocationOn />;

const homeIcon = <HomeIcon />;
const graphIcon = <GraphIcon />;

const style = {
  margin: 12,
};

const appStyle = {
  backgroundColor: 'white',
  height: '8%',
};

const titleStyle ={
  color: 'black',
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '25px',
  textTransform: 'lowercase',
  // marginLeft: '32%'
};

const navStyle = {
  position: 'fixed', 
  bottom: '0', 
  zIndex: '10', 
  textAlign: 'center',
};

const navLableStyle = {
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif'
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
      selectedIndex: 0
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

  handleSelect(index) {
    this.setState({selectedIndex: index});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="guestbook"
            titleStyle={titleStyle}
            style={appStyle}
            showMenuIconButton={false}
            zDepth={0}
            iconElementRight={<Logout />}/>
            <Paper zDepth={1}>
              <BottomNavigation 
                selectedIndex={this.state.selectedIndex}
                style={navStyle}>
                <BottomNavigationItem
                  style={navLableStyle}
                  label="my properties"
                  icon={homeIcon}
                  containerElement={<Link to='/properties' />}
                  onTouchTap={() => this.handleSelect(0)}
                />
                <BottomNavigationItem
                  style={navLableStyle}
                  label="my analytics"
                  icon={graphIcon}
                  containerElement={<Link to='/analytics' />}
                  onTouchTap={() => this.handleSelect(1)}
                />
              </BottomNavigation>
            </Paper>
          <div className='container'>
            {this.props.children}
            <Link to='/map'>Map</Link>
            <Link to='/camera'>Camera</Link>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(Main);