import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';
// import io from 'socket.io';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const muiTheme = getMuiTheme({
  palette: { accent1Color: '#E0F2F1' }
});

const styles = {
  button: {
    margin: 12,
  }
};

const socket = io();

// const mapStateToProps = function(store) {
//   return {
//     checkedIn: store.guestState.checkedIn
//   };
// }

class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleCheckIn = this.handleCheckIn.bind(this);
  }

  // componentDidMount() {
    // socket.on('checkin', this.handleCheckIn);
  // }

  // handleCheckIn() {
    // this.setState({
    //   checkedIn: true,
    //   checkInTime: new Date()
    // });
    // axios.put('/')
    //   .then()

    // }
  // }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> 
          <Card>
            <CardHeader
              title="get from redux"
            />
            <CardMedia overlay={<p>Enjoy your stay!</p>}>
              <img src="https://a2.muscache.com/im/pictures/74bc45b3-d473-4e5a-b927-2989bfd31834.jpg?aki_policy=xx_large" />
            </CardMedia>   
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Guest;

// export default connect(mapStateToProps)(Guest);

// export default connect(mapStateToProps)(Guest);
            // <div className='container'>
            //   {this.props.children}
            // </div>