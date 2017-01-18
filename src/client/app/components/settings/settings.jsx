import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {signOut} from '../../modules/actions';
import RaisedButton from 'material-ui/RaisedButton';

class Settings extends React.Component {
  constructor() {
    super();
  }

  handleLogOut() {
    this.props.dispatch(signOut());
    this.props.router.push('/');
    // check if logged into FB
    FB.logout((res) => {
      browserHistory.push('/');
    });
  }

  render() {
    return (
      <RaisedButton
        label='Logout'
        backgroundColor='#FF0800'
        onTouchTap={() => this.handleLogOut()} />
    )
  }
}

export default connect()(Settings);