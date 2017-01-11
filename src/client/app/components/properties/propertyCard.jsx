import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const PropertyCard = (props) => {
  return (
    <Card>
      <CardTitle title={props.property.name} subtitle={props.property.address}>
      </CardTitle>
    </Card>
  );
}

export default PropertyCard;