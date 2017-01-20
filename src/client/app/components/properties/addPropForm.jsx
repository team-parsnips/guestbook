import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Promise from 'bluebird'
import {addProperty, addPredictPrice} from '../../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = function(store) {
  console.log(store);
  return {
    user: store.userState,
    properties: store.propertyState
  };
}

class AddPropForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  addProp() {
    // create the property and store it into the db and populate redux with the new property
    let property = {
      UserId: this.props.user.user.id,
      name: this.refs.name.getValue(),
      location: this.refs.location.getValue(),
      price: this.refs.price.getValue(),
      personCapacity: this.refs.personCapacity.getValue(),
      checkInTime: '3pm',
      checkOutTime: '11am'      
    };
    let {dispatch} = this.props;
    axios.post('/property/', property)
    .then((res) => {
      console.log(res);
      dispatch(addProperty(res.data));
      return Promise.resolve(res.data);
    })
    // use the newly created property and request a predicted price, which is placed into redux
    .then((property) => {
      var airbnbAdd = property.location.split(' ').join('-');
      axios.post('/predict', {
        location: airbnbAdd,
        personCapacity: property.personCapacity
      })
      .then((res) => {
        dispatch(addPredictPrice(property, {predictedPrice: res.data[0].toFixed(2)}));
      });
    })
    .catch(err => {
      console.error('Error saving to DB', err);
      alert('Add property was not successful, please try again');
    });

    this.props.openHandler();
  }

  render() {
    return (
      <div>
        <Dialog
        title='Add your property'
        modal={false}
        open={this.props.open}
        onRequestClose={()=>{this.props.openHandler()}}>

          <TextField
          ref='name'
          hintText='Property Name'
          fullWidth={true}
          /><br />
          <TextField
          ref='location'
          hintText='Location'
          fullWidth={true}
          /><br />
          <TextField
          ref='personCapacity'
          hintText='Person Capacity'
          fullWidth={true}
          /><br />
          <TextField
          ref='price'
          hintText='Price'
          fullWidth={true}
          /><br />

          <RaisedButton
          label='Add'
          primary={true}
          onTouchTap={() => this.addProp()}
          />
        </Dialog>
      </div>
    );
  }
};

export default connect(mapStateToProps)(AddPropForm);
