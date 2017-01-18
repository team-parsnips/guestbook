import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const cardStyle = {
  height: '200px',
  width: '80%',
  margin: '0 auto',
  marginBottom: '50px'
};

const PropertyCard = (props) => {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={props.property.name} 
        subtitle={props.property.address}
        actAsExpander={true}
        showExpandableButton={true} />
      <CardMedia>
        <img src={props.property.photo} />
      </CardMedia>
      <CardActions expandable={true}>
        <RaisedButton label='Generate QR Code' onTouchTap={() => props.handleGenerateQR(props.property)}/>
      </CardActions>
    </Card>
  );
}

export default PropertyCard;