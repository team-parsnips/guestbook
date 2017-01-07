import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {addProperty} from '../../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = function(store) {
  console.log(store);
  return {
    properties: store.propertyState
  };
}

class AddPropForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: !this.state.open});
  }

  addProp() {
    var property, id, url;
    property = {
      name: this.refs.name.getValue(),
      address: this.refs.address.getValue()
    };
    let {dispatch} = this.props;
    id = Math.floor(Math.random()*10000);
    url = '/property/' + id;
    axios.post(url, {name: property.name,
      location: property.address,
      checkInTime: '3pm',
      checkOutTime: '11am'      
    })
    .then(res => {
      alert('success');
      dispatch(addProperty(property));  
    })
    .catch(err => {
      console.error('Error saving to DB', err);
      alert('Add property was not successful, please try again');
    });

  }

  render() {
    return (
      <div>
        <Dialog
        title='Add your property'
        modal={false}
        open={this.state.open}
        onRequestClose={()=>{this.setState({open: !this.state.open})}}>
          <TextField
          ref='name'
          hintText='Property Name'
          /><br />
          <TextField
          ref='address'
          hintText='Address'
          />
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