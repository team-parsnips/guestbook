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
      <CardMedia>
        <img src={props.property.photo} />
      </CardMedia>
      <CardActions expandable={true}>
        <RaisedButton label='Generate QR Code' onTouchTap={props.handleGenerateQR}/>
      </CardActions>
    </Card>
  );
}

export default PropertyCard;