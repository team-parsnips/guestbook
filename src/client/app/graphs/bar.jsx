import React from 'react';
import * as d3 from 'd3';
import * as Utils from '../utils/utils';


const margin = {
  top: 40,
  right: 10,
  bottom: 20,
  left: 10
};  

// const data = {
//   'x-ticks': 12,
//   'x-axis': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
//   data: {'Prop1': array, 'Prop2': array}
// }

class StackedGroupedBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || 960,
      innerWidth: (this.props.width || 960) - margin.left - margin.right,
      height: this.props.height || 500,
      innerHeight: (this.props.height ||500) - margin.top - margin.bottom,
      data: this.props.data || null,
      dataSet: null

    }
    this.sampleData = this.sampleData.bind(this);
    this.bumps = this.bumps.bind(this);
    this.populateData = this.populateData.bind(this);

  }

  sampleData() {
    let m = 58, n = 4, xz, yz, y01z, yMax, y1Max, dataSet;
    xz = d3.range(m);
    yz = d3.range(n).map(()=> this.bumps(m));
    y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz));
    yMax = d3.max(yz, y => d3.max(y));
    y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
    dataSet = {
      m: m,
      n: n,
      xz: xz,
      yz: yz,
      y01z: y01z,
      yMax: yMax,
      y1Max: y1Max
    };
    this.setState({ dataSet: dataSet });
  }

  populateData(data) {
    this.setState({data: data});
    this.setUpData();
  }

  componentWillMount() {
    var data = {
      'x-ticks': 12,
      'x-axis': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      'data': {Property1: [0, 636.79, 1342.08, 513.73, 801.52, 2280.67, 3056.40, 1778.24, 1359.55, 922.25, 710.89, 778.95],
               Property2: [1080.81, 1353.31, 0, 0, 0, 0, 0, 0, 0, 0, 635.98, 3811.97]}
    };
    // Utils.getBookings1(Utils.stackedRevenueBar, function(data1) {
    //   // this.setState({data: data});

    //   Utils.getBookings2(Utils.stackedRevenueBar, function(data2) {
    //     // this.setState({data: data});
    //     // console.log(data1);
    //     dataSet.data = Object.assign({}, data1.data, data2.data);
    //     console.log(dataSet);
    //     // populateData(dataSet);
    //   });    
    // });

    this.setState({data: data});
    console.log(data);
    this.setUpData(data);



    // if (!this.state.data) {
    //   this.sampleData();
    // } else {
    //   this.setUpData();
    // }
  }

  setUpData(input) {
    console.log(this.state.data);
    var m, n, xz, yz, y01z, yMax, y1Max, dataSet, transposedData = [], data = this.state.data || input;
    m = data['x-ticks'] || 25;
    xz = data['x-axis'] || d3.range(m);
    yz = data.data;
    n = Object.keys(yz).length;

    for (let i = 0; i < m; i++) {
      let entry = {};
      for (let key in yz) {
        entry[key] = yz[key][i]
      }
      transposedData.push(entry);
    }

    y01z = d3.stack().keys(Object.keys(yz)).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(transposedData);
    yMax = d3.max(Object.keys(yz), y => d3.max(yz[y]));
    y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
    dataSet = {
        m: m,
        n: n,
        xz: xz,
        yz: yz,
        y01z: y01z,
        yMax: yMax,
        y1Max: y1Max
      };

    this.setState({ dataSet: dataSet });
  }

  componentDidMount() {
    var svg, g, x, y, color, series, rect, timeout, data = this.state.dataSet;

    var width = this.props.width;
    var height = this.props.height;
    var innerWidth = this.props.width - margin.left - margin.right;
    var innerHeight = this.props.height - margin.top - margin.bottom;

    this.setState({width: width, height:height, innerWidth: innerWidth, innerHeight: innerHeight});

       svg = d3.select('.stackedgrouped').append('svg')
              .attr('width', width)
              .attr('height', height);
         g = svg.append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
         x = d3.scaleBand().domain(d3.range(data.m)).rangeRound([0, innerWidth]).padding(0.08);
         y = d3.scaleLinear().domain([0, data.y1Max]).range([innerHeight, 0]);
     color = d3.scaleOrdinal().domain(d3.range(data.n)).range(d3.schemeCategory20c);
    series = g.selectAll('.series').data(data.y01z).enter().append('g')
              .attr('fill', (d, i) => color(i))
              .attr('id', d => d.index);
      rect = series.selectAll('rect').data(d => d).enter().append('rect')
              .attr('x', (d, i) => x(i))
              .attr('y', innerHeight)
              .attr('width', x.bandwidth())
              .attr('height', 0);

    rect.transition().delay((d, i) => i * 10)
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]));

    g.append('g').attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + innerHeight + ')')
    .call(d3.axisBottom(x).tickSize(1).tickPadding(6).tickFormat(d => data.xz[d]));

    d3.selectAll('input').on('change', changed);

    timeout = d3.timeout(() => {
      d3.select('input[value="grouped"]').property('checked', true).dispatch('change');
    }, 2000);

    function changed() {
      console.log('changed');
      timeout.stop();
      if (this.value === 'grouped') {
        transitionGrouped();
      } else {
        transitionStacked();
      }
    }

    function transitionGrouped() {
      y.domain([0, data.yMax]);

      rect.transition()
          .duration(500)
          .delay((d, i) => i * 10)
          .attr('x', (d, i, g) => x(i) + x.bandwidth() / data.n * g[0].parentNode.__data__.index)
          .attr('width', x.bandwidth() / data.n)
        .transition()
          .attr('y', d => y(d[1] - d[0]))
          .attr('height', d => y(0) - y(d[1] - d[0]));
    }

    function transitionStacked() {
      y.domain([0, data.y1Max]);

      rect.transition()
          .duration(500)
          .delay((d, i) => i * 10)
          .attr('y', d => y(d[1]))
          .attr('height', d => y(d[0]) - y(d[1]))
        .transition()
          .attr('x', (d, i) => x(i))
          .attr('width', x.bandwidth());
    }

  }

  bumps(m) { //only used for sampleData
    var values = [], i, j, w, x, y, z;

    for (i = 0; i < m; i++) {
      values[i] = 0.1 + 0.1 * Math.random();
    }

    for (j = 0; j < 5; j++) {
      x = 1 / (0.1 + Math.random());
      y = 2 * Math.random() - 0.5;
      z = 10 / (0.1 + Math.random());
      for (i = 0; i < m; i++) {
        w = (i / m - y) * z;
        values[i] += x * Math.exp(-w * w);
      }
    }

    for (i = 0; i < m; i++) {
      values[i] = Math.max(0, values[i]);
    }

    return values;
  }

  render() {
    if (this.props.height !== this.state.height || this.props.width !== this.state.width) {
      var s = d3.select('.stackedgrouped').select('svg');
      s.remove();
      this.componentDidMount();
    }
    return (
      <div>
        <form>
          <label><input type='radio' name='mode' value='grouped'/>Grouped</label>
          <label><input type='radio' name='mode' value='stacked' defaultChecked/>Stacked</label>
        </form>
        <div className='stackedgrouped'></div>
      </div>
    );
  }
}

export default StackedGroupedBar;