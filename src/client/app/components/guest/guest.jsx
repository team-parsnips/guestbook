import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';

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

const mapStateToProps = function(store) {
  return {
    loggedIn: store.guestState.checkedIn
  };
}

class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCheckIn = this.handleCheckIn.bind(this);
  }

  componentDidMount() {
    socket.on('checkin', this.handleCheckIn);
  }

  handleCheckIn() {
    this.setState({
      checkedIn: true,
      checkInTime: new Date()
    });
    // send notification to the host
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div> 
          <Card>
            <CardHeader
              title="get from redux"
            />
            <CardMedia
              overlay={
                <Link to='/greet'>
                  <RaisedButton
                    label="Check in!"
                    secondary={true}
                    onClick={this.handleCheckIn}
                    style={styles.button}/>
                </Link>}>
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

export default connect(mapStateToProps)(Guest);

// export default connect(mapStateToProps)(Guest);
            // <div className='container'>
            //   {this.props.children}
            // </div>