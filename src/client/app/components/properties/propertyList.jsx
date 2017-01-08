import React from 'react';

import {connect} from 'react-redux';
import PropertyCard from './propertyCard.jsx';

const mapStateToProps = function(store) {
  console.log(store);
  return {
    properties: store.propertyState
  };
}

const PropertyList = (props) => {
  console.log('props', props);
  
  return (
    <div className='propertyList'>
    {
      props.properties.map((property, i) => (
        <PropertyCard property={property} key={i} />
      ))
    }
    </div>);
}

export default connect(mapStateToProps)(PropertyList);

