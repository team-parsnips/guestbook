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
    var margin = {top: 20, right: 20, bottom: 70, left: 50};
    var width = this.state.width;
    var height = this.state.height;

    var svg = d3.select(".scatter-plot").append("svg")
    .attr("width", width)
    .attr("height", height);

    var width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // format time
    var formatTime = d3.timeFormat("%I:%M %p");

    var parseTime = d3.timeParse("%d-%b-%y");

    Utils.getBookings(makeScatter, Utils.bookingTimeMap);

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleTime().range([height, 0]);

    // define the line
    var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

    function makeScatter(data) {

      x.domain(d3.extent(data, function(d) { return d.checkInTime; }));
      y.domain(d3.extent(data, function(d) { return d.checkOutTime; }));

      // add scattered points
      g.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d.checkInTime); })
          .attr("cy", function(d) { return y(d.checkOutTime); });

      // add and format x-axis
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(d3.timeMinute, 15).tickFormat(d3.timeFormat("%I:%M %p")))
        .selectAll("text")  
        .style("text-anchor", "middle")
        .attr("dx", "-.8em")
        .attr("dy", ".75em")
        // .attr("transform", "rotate(-30)");

      g.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 25) + ")")
        .style("text-anchor", "right")
        .style('font', '10px sans-serif')
        .text("Check In Time");

      // add and format y-axis
      g.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + x + ",0)")
        .call(d3.axisLeft(y));
        // .call(d3.axisLeft(y).ticks(d3.timeMinute, 15).tickFormat(d3.timeFormat("%I:%M %p")))

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1.5em")
        .style("text-anchor", "middle")
        .style('font', '10px sans-serif')
        .text("Check Out Time");     

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