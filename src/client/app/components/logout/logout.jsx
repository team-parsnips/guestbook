import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {signOut} from '../../modules/actions';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';


import LockOutline from 'material-ui/svg-icons/action/lock-outline';


const labelStyle = {
  color: '#BDBDBD',
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '18px',
  textTransform: 'lowercase',
};

class Logout extends React.Component {
  constructor() {
    super();
  }

  handleLogOut() {
    this.props.dispatch(signOut());
    browserHistory.push('/');
  }

  render() {
    return (
      <IconButton
        onTouchTap={() => this.handleLogOut()}
      >     
        <LockOutline color="#757575"/>
      </IconButton>
    )
  }
}


export default connect()(Logout);