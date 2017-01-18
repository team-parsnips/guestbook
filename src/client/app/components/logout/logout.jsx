import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {signOut} from '../../modules/actions';
import FlatButton from 'material-ui/FlatButton';


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
    this.props.router.push('/');
    // check if logged into FB
    FB.logout((res) => {
      browserHistory.push('/');
    });
  }

  render() {
    return (
      <FlatButton
        style={{marginTop: '7%'}}
        label='Logout'
        labelStyle={labelStyle}
        onTouchTap={() => this.handleLogOut()} />
    )
  }
}


export default connect()(Logout);