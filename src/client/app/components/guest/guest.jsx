import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';

import {checkIn} from '../../modules/actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const muiTheme = getMuiTheme({
  palette: { accent1Color: '#E0F2F1' }
});

const styles = {
  button: {
    margin: 12,
  }
};

const socket = io();

const mapStateToProps = function(store) {
  return {
    checkedIn: store.bookingState.checkedIn,
    // propertyName: store.propertyState.name
  };
}

class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostId: ''
    };
  }

  handleCheckIn() {
    let {dispatch} = this.props;

    axios.put('/booking/1', {checkInTime: new Date()})
      .then((response) => {
        dispatch(checkIn(response.data));
        var propertyId = response.data.PropertyId;
        axios.get('/property/' + propertyId)
          .then((property) => {
            var userId = property.data.UserId;
            this.setState({hostId: userId});
          })
      })
      .catch(err => {
        console.error('Error updating booking with check-in time', err);
      });

    // socket.emit('checkIn', {hostId: this.state.hostId});
    socket.emit('checkIn');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> 
          <Card>
            <CardMedia>
              <img src="https://a2.muscache.com/im/pictures/74bc45b3-d473-4e5a-b927-2989bfd31834.jpg?aki_policy=xx_large" />
            </CardMedia>   
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default connect(mapStateToProps)(Guest);