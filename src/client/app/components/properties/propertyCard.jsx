import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ActionAspectRatio from 'material-ui/svg-icons/action/aspect-ratio';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';

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
  color: '#616161',
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'white', 
};

const PropertyCard = (props) => {
  return (
    <Card style={cardStyle} zDepth={2}>
      <CardMedia style={{background: 'url(' + props.property.photo + ') no-repeat center',
      backgroundSize: 'cover', width: '100%', height: '100%', position: 'absolute'}}>
      </CardMedia>
      <CardText style={textStyle}>
        {props.property.name} | {props.property.location}
      </CardText>
      <CardActions>
        <IconButton onTouchTap={() => props.deleteProperty(props.property)}>
          <ActionDelete color="white" />
        </IconButton>
        <IconButton onTouchTap={() => props.handleGenerateQR(props.property)}>
          <ActionAspectRatio color="white" />
        </IconButton>
        <IconButton>
          <EditorAttachMoney color="white" /> 
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PropertyCard;