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
      width: 0,
      height: 0,
      data: this.props.bookings,
      sequenceData: [],
      pieData: []
    };
  }

  componentWillMount() {
    // set initial height/width
    this.setGraphSize();

    // set data of sequence/pie with all bookings
    this.setState({
      sequenceData: Utils.bookingMap(this.props.bookings),
      pieData: Utils.bookingPie(this.props.bookings),
    });

    // add event listener to invoke setGraphSize on window resize events
    var context = this;
    window.addEventListener("resize", function() {
      console.log('invoking setGraphSize');
      context.setGraphSize();
      context.forceUpdate();
    });
  }

  setGraphSize() {
    this.setState({
      height: 0.5 * window.innerHeight,
      width: 0.67 * window.innerWidth
    });
  }

  render() {
    return (
      <div style={containerStyle}>
        <Card
          style={cardStyle}>
          <CardTitle title="Monthly Revenue" />
          <CardMedia>
            <StackedGroupedBar width={this.state.width} height={this.state.height}/>
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Visits by Time of Year" />
          <CardMedia>
            <SequenceSunBurst width={this.state.width} height={this.state.height} data={this.state.sequenceData} />
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Check Out vs Check In Times" />
          <CardMedia>
            <ScatterPlot width={this.state.width} height={this.state.height}/>
          </CardMedia>
        </Card>
        <Card
          style={cardStyle}>
          <CardTitle title="Duration of Stay" />
          <CardMedia>
            <Pie width={this.state.width} height={this.state.height} data={this.state.pieData} group='durationOfStay' count='freq'/>
          </CardMedia>
        </Card>
      </div>
    );
  }
};

export default connect(mapStateToProps)(Analytics);
