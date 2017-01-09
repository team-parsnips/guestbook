import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
// import {populateProperties} from '../../modules/actions';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import SequenceSunBurst from '../../graphs/sequence.jsx';
import ScatterPlot from '../../graphs/scatter.jsx';


class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SequenceSunBurst />
        <ScatterPlot />
      </div>
    );
  }
};

export default connect()(Analytics);