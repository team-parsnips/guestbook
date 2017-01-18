import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import LoginContainer from './loginContainer.jsx';
import CameraContainer from './camera/cameraContainer.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardMedia} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


const divStyle = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/unsplash2.jpg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  flexDirection: 'column',
};

const logoStyle = {
  height: '200px',
  width: '200px',
  marginTop: '50%',
  marginLeft: '25%',
  zIndex: '3'
};

const buttonStyle = {
  margin: 12,
  width: '100px',
  height: '44px',
  marginTop: '20%',
  // backgroundColor: 'rgba(144, 164, 174, 0.5)',
  // opacity: '0.5'
};

const labelStyle = {
  fontSize: '24px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'Pacifico',
  textTransform: 'lowercase',
  // color: 'rgba(0,0,0,1)'
  // opacity: '1'
};


class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      open: false,
      message: ''
    };
  }

  handleLogin() {
    this.setState({
      loginOpen: true,
    });
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  // displays snackbar for login messages
  handleLoginMessages(message) {
    this.setState({open: true, message: message});
  }

  // displays snackbar on a successful qr code scan
  handleScan(data) {
    this.setState({open: true, message: 'Please wait. Checking in now...'});
    setTimeout(function() {
      window.location.href = data;
    }, 1000);
  }

  // displays error snackbar on bad qr code scan
  handleError(err) {
    console.log('error', err);
    this.setState({open: true, message: 'Sorry, I couldn\'t get that. Please try scanning again'});
  }

  render() {
    var login = this.state.loginOpen ? <LoginContainer handleLoginMessages={(message) => this.handleLoginMessages(message)}/> : null;
    return (
      <MuiThemeProvider>
        <div style={divStyle}>
          <div className='divOne' style={{display: 'inline-block', height: '55%', width: '100%'}}>
            <img src='/guestbook3.png' style={logoStyle} />
          </div>
          <div className='divTwo' 
          style={{display: 'inline-block', height: '55%', width: '100%', textAlign: 'center'}}>
            <RaisedButton 
              backgroundColor='#B0BEC5'
              label="host" 
              style={buttonStyle} 
              onTouchTap={() => this.handleLogin()}
              labelStyle={labelStyle} />
            { login }
            <CameraContainer 
              handleScan={(data) => this.handleScan(data)}
              handleError={(err) => this.handleError(err)}/>
          </div>
            <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={2000}
              onRequestClose={() => this.handleRequestClose()}/>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default Splash;