import React from 'react';
import {connect} from 'react-redux';
import Map from './map.jsx';

const mapStateToProps = function(store) {
  return {
    properties: store.propertyState,
    bookings: store.bookingState
  }
}

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Map properties={ this.props.properties } bookings={ this.props.bookings }/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MapContainer);