import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import LoginContainer from './loginContainer.jsx';

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
  height: '450px',
  width: '450px',
  marginTop: '50%',
  marginLeft: '27%',
  zIndex: '3'
};

const buttonStyle = {
  margin: 12,
  width: '400px',
  height: '100px',
  marginTop: '20%',
  // backgroundColor: '#90A4AE'
};

const labelStyle = {
  fontSize: '75px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'Pacifico',
  textTransform: 'lowercase'
};


class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false
    };
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
          <div className='divOne' style={{display: 'inline-block', height: '55%', width: '100%'}}>
            <img src='/guestbook3.png' style={logoStyle} />
          </div>
          <div className='divTwo' 
          style={{display: 'inline-block', height: '55%', width: '100%', textAlign: 'center'}}>
            <RaisedButton 
              backgroundColor='#90A4AE'
              label="host" 
              style={buttonStyle} 
              onTouchTap={() => this.handleLogin()}
              labelStyle={labelStyle} />
            {login}
            <Link to='/camera'>
              <RaisedButton 
                backgroundColor='#90A4AE'
                label="guest"
                style={buttonStyle}
                labelStyle={labelStyle}
                />
            </Link>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default Splash;


        // <div style={divStyle}>
        //   <div style={{height: '550px', width:'550px', display: 'inline-block'}}>
        //     <img src='/guestbook3.png' style={logoStyle} />
        //   </div>
        //   <div style={{display: 'inline-block'}}>
        //     <Link to='/camera'>
        //       <RaisedButton 
        //         label="Guest"
        //         style={buttonStyle}
        //         fullWidth={true} />
        //     </Link>
        //     <RaisedButton label="Host" onTouchTap={() => this.handleLogin()} />
        //       { login }
        //   </div>
        // </div>