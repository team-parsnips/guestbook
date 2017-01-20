import React from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import io from 'socket.io-client';

import {signIn, populateProperties, populateBookings} from '../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FbLogin from './login/fbLogin.jsx';

const customContentStyle = {
  width: '75%',
  maxWidth: 'none',
  height: '50%'
};

const titleStyle = {
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '20px',
  // color: '#616161'
}

const fieldStyle = {
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '14px',
}

const labelStyle = {
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '16px',
  textTransform: 'capitalize',
}
// const socket = io();

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  // verifies username/password with db
  handleSignIn() {
    axios.post('/login', {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    })
    .then((res) => {
      // error handling
      if (res.data.error) {
        this.props.handleLoginMessages(res.data.message);
      } else {
        // successful signin with receipt of user object
        this.props.dispatch(signIn(res.data));
        browserHistory.push('/properties');
      }
    });
    // socket.emit('hostLogIn', {hostId: 1});
  }

  // signin for fb users
  handleFbSignIn(email, id, firstName, lastName) {
    axios.post('/login/fb', {
      email: email,
      password: id,
      firstName: firstName,
      lastName: lastName
    }).then((res) => {
      console.log(res);
      // successful signin with receipt of user object
      this.props.dispatch(signIn(res.data));
      browserHistory.push('/properties');
    });
  }

  render() {
    const actions = [
      <RaisedButton
        label='Sign In'
        labelStyle={labelStyle}
        fullWidth={true}
        onTouchTap={() => this.handleSignIn()}
        id='loginButton' />,
      <FbLogin handleSignIn={(email, id, firstName, lastName) => this.handleFbSignIn(email, id, firstName, lastName)} />
    ];

    return (
      <Dialog
        title='Welcome to guestbook! Please sign in'
        titleStyle={titleStyle}
        actions={actions}
        modal={true}
        contentStyle={customContentStyle}
        open={this.state.open}
      >
        <TextField
          ref='email'
          hintText='Email Address'
          fullWidth={true}
          id='email'
          style={fieldStyle}
        /><br />
        <TextField
          ref='password'
          hintText='Password'
          fullWidth={true}
          type='password'
          id='password'
          style={fieldStyle}
        /> 
      </Dialog>
    );
  }
}

export default connect()(LoginContainer);