import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const socket = io();

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

const mapStateToProps = function(store) {
  return {
    propertyName: store.propertyState.name,
  };
}

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hostId: '',
      propertyName: undefined,
      propertyPic: undefined,
    };
  }

  componentWillMount() {
    // populates state with property info based on url param
    var propertyId = this.props.params.id;
    var context = this;
    axios.get('/property/' + propertyId)
    .then((res) => {
      context.setState({
        propertyName: res.data.name,
        propertyPic: res.data.photo,
      });
      socket.emit('guest checked in', {propertyName: res.data.name});
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={divStyle}>
          <div style={{display: 'inline-block', height: '70%', width: '100%', 
          background: 'url("' + this.state.propertyPic + '") no-repeat center',
          backgroundSize: 'cover'}}> 
          </div> 
          <div className="div2" style={textStyle}>
            <p style={{fontSize: '18px'}}>{"you're checked in at " + this.state.propertyName}</p> 
            <p style={{fontSize: '50px'}}>Enjoy.</p>
          </div>  
        </div>
      </MuiThemeProvider>
    );
  }
}


export default connect(mapStateToProps)(Guest);



  // handleCheckIn() {
  //   let {dispatch} = this.props;

  //   axios.put('/booking/1', {checkInTime: new Date()})
  //     .then((response) => {
  //       dispatch(checkIn(response.data));
  //       var propertyId = response.data.PropertyId;
  //       axios.get('/property/' + propertyId)
  //         .then((property) => {
  //           var userId = property.data.UserId;
  //           this.setState({hostId: userId});
  //         })
  //     })
  //     .catch(err => {
  //       console.error('Error updating booking with check-in time', err);
  //     });
  //   socket.emit('checkIn');
  // }