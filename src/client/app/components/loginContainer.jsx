import React from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import {signIn, populateProperties, populateBookings} from '../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FbLogin from './login/fbLogin.jsx';

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

  handleSignIn() {
/*    let user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    }*/
    let user = {
      email: 'test',
      password: 'test'
    };
    this.props.dispatch(signIn(user));
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
      <FbLogin handleSignIn={() => this.handleSignIn()}/>
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