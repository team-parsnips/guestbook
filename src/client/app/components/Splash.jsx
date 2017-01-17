import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';
import LoginContainer from './loginContainer.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardMedia} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


const divStyle = {
  display: 'flex',
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  height: '100%',
  'backgroundImage': 'url("/unsplash2.jpg")',
  'backgroundRepeat': 'no-repeat',
  'objectFit': 'cover' 
};

const logoStyle = {
  // textAlign: 'center',
  height: '550px',
  width: '550px',
  marginTop: '60%',
  marginLeft: '2%',
  position: 'relative',
  zIndex: '3'
};

const buttonStyle = {
  margin: 12,
};

const socket = io();


class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loginOpen: false
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

  handleLogin() {
    this.setState({
      loginOpen: true,
    });
  }

  render() {
    var login = this.state.loginOpen ? <LoginContainer /> : null;
    return (
      <MuiThemeProvider>
        <div style={divStyle}>
          <Link to='/camera'>
            <RaisedButton label="Guest" style={buttonStyle} />
          </Link>
            <RaisedButton label="Host" onTouchTap={() => this.handleLogin()} />
            { login }
          <img src='/guestbook.png' style={logoStyle} />
        </div>
        <Snackbar
          open={this.state.open}
          message="A guest has checked into your property!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}/>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default Splash;
// export default connect()(LoginContainer);
              //<img src='/unsplash2.jpg' />

              /*<Card style={divStyle}>
            <CardMedia mediaStyle={imgStyle}>
              <img src='/unsplash2.jpg' style={imgStyle} />    
            </CardMedia>
          </Card>
          */
              //<Paper style={logoStyle} zDepth={1} circle={true} />
      // <div style={divStyle}>
      //  
      // </div>