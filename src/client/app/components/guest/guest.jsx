import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: { accent1Color: '#E0F2F1' }
});

const divStyle = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
}

const textStyle = {
  display: 'inline-block',
  height: '45%',
  width: '100%',
  fontFamily: 'Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif',
  textAlign: 'center',
  color: '#757575'
};

const socket = io();

const mapStateToProps = function(store) {
  return {
    // checkedIn: store.bookingState.checkedIn,
    propertyName: store.propertyState.name,
    // property: store.propertyState.name
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
        <div style={divStyle}>
          <div style={{display: 'inline-block', height: '70%', width: '100%', 
          background: 'url("https://s-media-cache-ak0.pinimg.com/564x/ea/5c/66/ea5c66e6c551fcdf4669523ba83a62df.jpg") no-repeat center',
          backgroundSize: 'cover'}}> 
          </div> 
          <div className="div2" style={textStyle}>
            <p style={{fontSize: '18px'}}>{"you're checked in at " + this.props.propertyName}</p> 
            <p style={{fontSize: '50px'}}>Enjoy.</p>
          </div>  
        </div>
      </MuiThemeProvider>
    );
  }
}


export default connect(mapStateToProps)(Guest);