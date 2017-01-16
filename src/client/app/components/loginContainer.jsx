import React from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import {signIn, populateProperties, populateBookings} from '../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
  width: '75%',
  maxWidth: 'none',
  height: '50%'
};

// const socket = io();

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  fbLogin() {
    this.handleSignIn();
    window.location = "https://www.facebook.com/v2.8/dialog/oauth?client_id=1736938369968580&redirect_uri=http://localhost:4000/properties";
  }

  handleSignIn() {
    let {dispatch} = this.props;
    let user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    }
    // store user object within redux
    dispatch(signIn(user));
    // hydrates redux store with all of user's properties and bookings
    // get allData for a specific user
    axios.get('/allData')
    .then(response => {
      dispatch(populateProperties(response.data.properties));
      dispatch(populateBookings(response.data.bookings));
    })
    .catch(err => {
      console.error('Error fetching properties and bookings', err);
    });
    browserHistory.push('/properties');
    // socket.emit('hostLogIn', {hostId: 1});
  }

  render() {
    const actions = [
      <RaisedButton
        label='Sign In'
        fullWidth={true}
        onTouchTap={() => this.handleSignIn()}
        id='loginButton'/>,
      <RaisedButton
        label='Login with Facebook'
        backgroundColor='#3B5998'
        fullWidth={true}
        onTouchTap={() => this.fbLogin()} />
    ];

    return (
      <Dialog
        title='Welcome to GuestBook! Please sign in'
        actions={actions}
        modal={true}
        contentStyle={customContentStyle}
        open={true}
      >
        <TextField
          ref='email'
          hintText='Email Address'
          fullWidth={true}
          id='email'
        /><br />
        <TextField
          ref='password'
          hintText='Password'
          fullWidth={true}
          type='password'
          id='password'
        /> 
      </Dialog>
    );
  }
}

export default connect()(LoginContainer);