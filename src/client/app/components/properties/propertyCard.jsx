import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ActionAspectRatio from 'material-ui/svg-icons/action/aspect-ratio';

var propertyPhoto;

const cardStyle = {
  width: '90%',
  height: '300px',
  display: 'inline-block',
  margin: '0 auto',
  overFlow: 'hidden'
};

const divStyle={
  background: 'url("' + propertyPhoto + '") no-repeat center',
  backgroundSize: 'cover'
}

const textStyle = {
  fontFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
  fontSize: '20px',
  marginLeft: '10%', 
  color: '#757575'
};

const PropertyCard = (props) => {
  propertyPhoto = props.property.photo;
  return (
    <Card style={cardStyle}>
      <CardMedia>       
        <img src={props.property.photo} />
      </CardMedia>
    </Card>
  );
}

export default PropertyCard;


    // <Card zDepth={1}>
    //   <CardMedia style={{height: '200px', width: '90%', margin: '0 auto', marginTop: '50px',
    //   background: 'url("' + props.property.photo + '") no-repeat center',
    //   backgroundSize: 'cover'}}></CardMedia>
    //   <CardText style={textStyle}>{props.property.name} | {props.property.location}</CardText>
    //   <CardActions>
    //     <IconButton onTouchTap={() => props.handleGenerateQR(props.property)}>
    //      <ActionAspectRatio /> 
    //     </IconButton>
    //   </CardActions>
    // </Card>
