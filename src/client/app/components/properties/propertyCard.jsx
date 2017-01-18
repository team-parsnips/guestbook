import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// const cardStyle = ;
    // marginBottom: '50px'
const textStyle = {
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '20px',
  marginLeft: '10%', 
  color: '#757575'
};

const PropertyCard = (props) => {
  return (
    <Card zDepth={1}>
      <CardMedia style={{height: '200px', width: '90%', margin: '0 auto', marginTop: '50px',
      background: 'url("' + props.property.photo + '") no-repeat center',
      backgroundSize: 'cover'}}></CardMedia>
      <CardText style={textStyle}>{props.property.name}</CardText>
      <CardText>{props.property.location}</CardText>
      <CardActions>
        <RaisedButton label='Generate QR Code' onTouchTap={() => props.handleGenerateQR(props.property)}/>
      </CardActions>
    </Card>
  );
}

export default PropertyCard;


      // <CardMedia>
        // <img src={props.property.photo} />
      // </CardMedia>
      // <CardHeader
      //   title={props.property.name} 
      //   subtitle={props.property.address}
      //   actAsExpander={true}
      //   showExpandableButton={true} />