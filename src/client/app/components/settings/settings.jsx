import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';

class Settings extends React.Component {
  constructor() {
    super();
  }

  handleLogOut() {
    // check if logged into FB
    FB.logout((res) => {
      console.log('logout res', res);
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

export default Settings;