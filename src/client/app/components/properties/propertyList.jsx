import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import {connect} from 'react-redux';
import PropertyCard from './propertyCard.jsx';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const deleteStyle = {
  backgroundColor: 'red'
}

class PropertyList extends React.Component {

  render() {
    var context = this;
    return (
      <div className='propertyList'>
      {
        this.props.properties.map((property, i) => (
          <SwipeableViews index={0} onChangeIndex={(index) => {index === 1 ? context.props.deleteProperty(property) : null}} key={property.id}>
            <div>
              <PropertyCard 
                property={property} 
                handleGenerateQR={this.props.handleGenerateQR}/>
            </div>
            <div>
              <Card style={deleteStyle}>
                <CardTitle title='DELETE DELETE DELETE' />
              </Card>
            </div>
          </SwipeableViews>
        ))
      }
      </div>);
  }
}

export default PropertyList;

