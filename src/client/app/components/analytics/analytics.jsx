import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import StackedGroupedBar from '../../graphs/bar.jsx';
import ScatterPlot from '../../graphs/scatter.jsx';
import { SequenceSunBurst, Pie } from 'red3';

import * as Utils from '../../utils/utils';

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
    this.state = {
      data: this.props.bookings,
      sequenceData: [],
      pieData: []
    };
  }

  componentWillMount() {
    // set initial data of sequence and pie with all bookings
    this.setState({
      sequenceData: Utils.bookingMap(this.props.bookings),
      pieData: Utils.bookingPie(this.props.bookings),
    });
  }

  render() {
    return (
      <div style={containerStyle}>
        <Card
          style={cardStyle}>
          <CardTitle title="Monthly Revenue" />
          <CardMedia>
            <StackedGroupedBar width={250} height={300}/>
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Visits by Time of Year" />
          <CardMedia>
            <SequenceSunBurst width={250} height={300} data={this.state.sequenceData} />
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
            <Pie width={250} height={300} data={this.state.pieData} group='durationOfStay' count='freq'/>
          </CardMedia>
        </Card>
      </div>
    );
  }
};

export default connect(mapStateToProps)(Analytics);
