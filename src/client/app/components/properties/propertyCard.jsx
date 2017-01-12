import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const PropertyCard = (props) => {
  return (
    <Card>
      <CardHeader
        title={props.property.name} 
        subtitle={props.property.address}
        actAsExpander={true}
        showExpandableButton={true} />
      <CardActions expandable={true}>
        <RaisedButton label='Generate QR Code' onTouchTap={props.handleGenerateQR}/>
        <img id='map'></img>
      </CardActions>
    </Card>
  );
}

export default PropertyCard;