import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ActionAspectRatio from 'material-ui/svg-icons/action/aspect-ratio';

var propertyPhoto;

const cardStyle = {
  width: '90%',
  height: '300px',
  marginLeft: '5%',
  overflow: 'hidden',
  position: 'relative',
  display: 'inline-block',
};

const textStyle = {
  fontSize: '14px',
  marginLeft: '10%', 
  color: '#616161'
};

const PropertyCard = (props) => {
  return (
    <Card style={cardStyle} zDepth={2}>
      <CardMedia style={{background: 'url(' + props.property.photo + ') no-repeat center', backgroundSize: 'cover'}}>
      </CardMedia>
      <CardText style={textStyle}>
        {props.property.name} | {props.property.location}
      </CardText>
    </Card>
  );
}

export default PropertyCard;

//<CardMedia style={{position: 'absolute', minHeight: '75%', minWidth: '100%'}}>       
//  <img src={props.property.photo} />
//</CardMedia>


    // <Card zDepth={1}>
    //   
    //   <CardText style={textStyle}>{props.property.name} | {props.property.location}</CardText>
    //   <CardActions>
    //     <IconButton onTouchTap={() => props.handleGenerateQR(props.property)}>
    //      <ActionAspectRatio /> 
    //     </IconButton>
    //   </CardActions>
    // </Card>
