import React from 'react';
import * as d3 from 'd3';
import * as Utils from '../utils/utils';

class ScatterPlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 500,
      options: {
        // styles here!
      }
    }
  }

  componentDidMount() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = this.state.width;
    var height = this.state.height;

    var svg = d3.select(".scatter-plot").append("svg")
    .attr("width", width)
    .attr("height", height);

    var width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    Utils.getBookings(makeScatter, Utils.bookingTimeMap);

    var parseDate = d3.timeParse("%h:%m %p").parse;

    function makeScatter(data) {

      console.log(data);

      var x = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.checkIn; }))
          .range([0, width]);

      var y = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.checkOut; }))
          .range([height, 0]);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .call(d3.axisBottom(x)
            .ticks(13, "s"));

      g.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 7) + ")")
        .style("text-anchor", "right")
        .style('font', '10px sans-serif')
        .text("Check In Time");

      g.append("g")
        .attr("transform", "translate(" + x + ",0)")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y)
            .ticks(9, 's'));

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style('font', '10px sans-serif')
        .text("Check Out Time");     

      g.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d.checkIn); })
          .attr("cy", function(d) { return y(d.checkOut); });
          // .style("fill", function(d) { return color(d.species); });
    }
    // });
  }

  render() {
    return (
      <div className="scatter-plot"></div>
    );
  }
}

export default ScatterPlot;