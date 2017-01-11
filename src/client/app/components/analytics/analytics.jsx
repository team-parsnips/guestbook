import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
// import {populateProperties} from '../../modules/actions';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import StackedGroupedBar from '../../graphs/bar.jsx';
import SequenceSunBurst from '../../graphs/sequence.jsx';
import ScatterPlot from '../../graphs/scatter.jsx';
import Pie from '../../graphs/pie.jsx';

const containerStyle = {
  textAlign: 'center'
}

const cardStyle = {
  width: '75%',
  display: 'inline-block'
}

const mapStateToProps = function(store) {
  return {
    properties: store.propertyState,
    bookings: store.bookingState
  }
}

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('analytics', this.props.properties);
    console.log('bookings', this.props.bookings);
  }

  render() {
    return (
      <div style={containerStyle}>
        <Card
          style={cardStyle}>
          <CardTitle title="Monthly Revenue" />
          <CardMedia>
            <StackedGroupedBar />
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Visits by Time of Year" />
          <CardMedia>
            <SequenceSunBurst />
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Check Out vs Check In Times" />
          <CardMedia>
            <ScatterPlot />
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Duration of Stay" />
          <CardMedia>
            <Pie width={960} height={500} group='durationOfStay' count='freq'/>
          </CardMedia>
        </Card>
      </div>
    );
  }
};

export default connect(mapStateToProps)(Analytics);
