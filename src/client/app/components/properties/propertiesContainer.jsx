import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import AddIcon from 'material-ui/svg-icons/content/add-circle';


import AddPropForm from './addPropForm.jsx';

class PropertiesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProp: false
    };

    this.handleAddProperty = this.handleAddProperty.bind(this);
  }

  handleAddProperty() {
    this.setState({addProp: !this.state.addProp});
  }

  render() {

    return (
      <div>
        <Card
        onTouchTap={()=> {this.handleAddProperty()}}
        icon={AddIcon}
        >
          <CardTitle>Add a property!</CardTitle>
          <CardActions icon={AddIcon}></CardActions>      
        </Card>
        <AddPropForm open={this.state.addProp} />
      </div>
    );
  }
};

export default PropertiesContainer;