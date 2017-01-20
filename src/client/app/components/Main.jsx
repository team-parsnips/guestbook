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
import Add from 'material-ui/svg-icons/content/add';


import LoginContainer from './loginContainer.jsx';
import Logout from './logout/logout.jsx';

const socket = io();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    primary1Color: '#90A4AE',
  },
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif'
});

const homeIcon = <HomeIcon />;
const graphIcon = <GraphIcon />;

const appStyle = {
  backgroundColor: 'white',
  height: '9%',
  position: 'sticky',
};

const titleStyle ={
  color: 'black',
  fontFamily: 'Pacifico',
  fontSize: '30px',
  marginLeft: '30%',
  textTransform: 'lowercase',
};

const navStyle = {
  height: '9%',
  width: '100%',
  textAlign: 'center',
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
      selectedIndex: 0,
      propertyName: ''
    };
  }

  componentDidMount() {
    socket.emit('hostLogin', {hostId: 1});
    socket.on('guest checked in', (data) => {
      this.handleGuestCheckIn();
      this.setState({propertyName: data.propertyName});
    });
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
          <Paper zDepth={0} style={navStyle}>
            <BottomNavigation 
              selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="my properties"
                icon={homeIcon}
                containerElement={<Link to='/properties' />}
                onTouchTap={() => this.handleSelect(0)}
              />
              <BottomNavigationItem
                label="my analytics"
                icon={graphIcon}
                containerElement={<Link to='/analytics' />}
                onTouchTap={() => this.handleSelect(1)}
              />
            </BottomNavigation>
          </Paper>
          <div className='container'>
            {this.props.children}  
          </div>
          <Snackbar
            open={this.state.open}
            message={"A guest has checked into " + this.state.propertyName}
            autoHideDuration={4000}
            onRequestClose={() => this.handleRequestClose()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

          
export default connect(mapStateToProps)(Main);

