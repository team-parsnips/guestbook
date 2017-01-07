import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {addProperty} from '../../modules/actions';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class AddPropForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: true});
  }

  addProp() {
    let property = {
      name: this.refs.name.getValue(),
      address: this.refs.address.getValue()
    };

    let {dispatch} = this.props;
    dispatch(addProperty(property));
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

export default connect()(AddPropForm);