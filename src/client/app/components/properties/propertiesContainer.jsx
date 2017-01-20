import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';

import {connect} from 'react-redux';
import {populateProperties, populateBookings, deleteProperty} from '../../modules/actions';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import MapsMap from 'material-ui/svg-icons/maps/map';
import ContentClear from 'material-ui/svg-icons/content/clear'

import { Menu, MainButton, ChildButton } from 'react-mfb'
// import 'react-mfb/mfb.css'
// import '../styles/ionicons.min.css'; //(downloaded from the ionicons.com website and then put it manually into my project)


import PropertyList from './propertyList.jsx';
import AddPropForm from './addPropForm.jsx';

const cardStyle = {
  diplay: 'flex',
  'justifyContent': 'center',
  'alignItem': 'center',
  position: 'sticky',
  backgroundColor: '#B3E5FC'
}

const addStyle = {
  margin: 0,
  top: 'auto',
  left: 20,
  bottom: 20,
  right: 'auto',
  position: 'fixed',
  zIndex: 10
};

const mapStyle = Object.assign({}, addStyle);
mapStyle.bottom = 80;

const mapStateToProps = function(store) {
  return {
    properties: store.propertyState
  };
}

class PropertiesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProp: false,
      open: false,
      openPrice: false,
      price: 0,
      predictedPrice: 0
    };
    this.openHandler = this.openHandler.bind(this);
  }

  componentWillMount() {
    let {dispatch} = this.props;
    // hydrates redux store with all of user's properties and bookings
    axios.get('/allData')
    .then(response => {
      dispatch(populateProperties(response.data.properties));
      dispatch(populateBookings(response.data.bookings));
    })
    .catch(err => {
      console.error('Error fetching properties and bookings', err);
    });
  }

  // handles opening card with adding a property
  openHandler() {
    this.setState({addProp: !this.state.addProp});
  }

  // removes property from redux/db
  deleteProperty(property) {
    this.props.dispatch(deleteProperty(property));
  }

  // gets QR Code handling check-in of that property
  handleGenerateQR(property) {
    axios.get('/qrCode/' + property.id, {responseType: 'arraybuffer'})
    .then((res) => {
      this.setState({open: true});
      var map = document.getElementById('map');
      var arr = new Uint8Array(res.data);
      var raw = String.fromCharCode.apply(null, arr);
      var b64 = btoa(raw);
      map.src = 'data:image/png;base64,' + b64;
    })
  }

  // retrieves price of the property selected and opens dialog box for price/predictedPrice
  handleViewPrice(property) {
    console.log(property);
    this.setState({
      openPrice: true,
      price: property.price,
      predictedPrice: property.predictedPrice
    });
  }

  // handles closing of qrcode dialog
  handleClose() {
    this.setState({open: false});
  }

  // handles closing of price dialog
  handlePriceClose() {
    this.setState({openPrice: false});
  }

  render() {

    var panel = document.getElementById('panel'),
    showcode = document.getElementById('showcode'),
    selectFx = document.getElementById('selections-fx'),
    selectPos = document.getElementById('selections-pos'),
    selectMethod = document.getElementById('selections-method');
    var effect = 'zoomin',
    pos = 'br',
    method = 'hover';

    const actions = [
      <IconButton onTouchTap={() => this.handleClose()}>
        <ContentClear />
      </IconButton>
    ];

    const priceActions = [
      <IconButton onTouchTap={() => this.handlePriceClose()}>
        <ContentClear />
      </IconButton>
    ];
    return (
      <div>
        <Dialog
          title="QR Code"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}>
          <img id='map'></img>
        </Dialog>
        <Dialog
          title="Price"
          actions={priceActions}
          open={this.state.openPrice}
          onRequestClose={() => this.handleClose()}>
          Current Price: {this.state.price} <br/>
          Predicted Price: {this.state.predictedPrice}
        </Dialog>
        <PropertyList 
          properties={this.props.properties}
          deleteProperty={(property) => this.deleteProperty(property)}
          handleGenerateQR={(property) => this.handleGenerateQR(property)}
          handleViewPrice={(property) => this.handleViewPrice(property)}/>
          <FloatingActionButton 
            onTouchTap={()=> {this.openHandler()}}
            style={addStyle}>
            <ContentAdd />
          </FloatingActionButton>
          <Link to="/map">
            <FloatingActionButton style={mapStyle}>
              <MapsMap />
            </FloatingActionButton>
          </Link>

        <AddPropForm openHandler={this.openHandler} open={this.state.addProp}/>
      </div>
    );
  }
};


export default connect(mapStateToProps)(PropertiesContainer);