import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {deleteProperty} from '../../modules/actions';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RaisedButton from 'material-ui/RaisedButton';

import PropertyList from './propertyList.jsx';
import AddPropForm from './addPropForm.jsx';

const cardStyle = {
  diplay: 'flex',
  'justifyContent': 'center',
  'alignItem': 'center'
}

const buttonStyle = {
  margin: '0 auto'
}

const mapStateToProps = function(store) {
  return {
    properties: store.propertyState
  };
}

class PropertiesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProp: false
    };
    this.openHandler = this.openHandler.bind(this);
  }

  openHandler() {
    this.setState({addProp: !this.state.addProp});
  }

  // removes property from redux/db
  deleteProperty(property) {
    this.props.dispatch(deleteProperty(property));
  }

  // gets QR Code handling check-in of that property
  handleGenerateQR(property) {
    axios.get('/qrCode', {responseType: 'arraybuffer'})
    .then((res) => {
      var arr = new Uint8Array(res.data);
      var raw = String.fromCharCode.apply(null, arr);
      var b64 = btoa(raw);
      map.src = 'data:image/png;base64,' + b64;
    })
  }

  render() {
    return (
      <div>
        <PropertyList 
          properties={this.props.properties}
          deleteProperty={(property) => this.deleteProperty(property)}
          handleGenerateQR={() => this.handleGenerateQR()}/>
        <Card
          onTouchTap={()=> {this.openHandler()}}
          style={cardStyle}
        >
        <RaisedButton fullWidth={true} icon={<AddIcon />} label='Add a Property'/>
        </Card>
        <AddPropForm openHandler={this.openHandler} open={this.state.addProp}/>
      </div>
    );
  }
};

export default connect(mapStateToProps)(PropertiesContainer);