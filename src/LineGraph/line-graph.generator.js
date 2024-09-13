import * as d3 from "d3";
import cx from "classnames";
import moment from "moment";
import _ from "lodash";

import { convertPercentChange, buildXTicks } from "./line-graph.transform";

const GraphLineColors = [
  "lineZero",
  "lineOne",
  "lineTwo",
  "lineThree",
  "lineFour",
  "lineFive",
];

// Graph Dimensions
const totalWidth = 900;
const totalHeight = 440;
const margin = { top: 20, right: 20, bottom: 60, left: 40 };
const graphWidth = totalWidth - margin.left - margin.right;
const graphHeight = totalHeight - margin.top - margin.bottom;

const yTicksCount = 6;

let prevPercentChange = 0;

/* istanbul ignore next */
const drawModeledPerformanceGraph = (
  rawChartData,
  startDate,
  endDate,
  showChipValue,
  setPercentChangeData
) => {
  // when redrawing the graph with new data, this removes the old graph
  d3.select("#isa-modeled-performance-chart > *").remove();

  // set chart data
  const chartData = rawChartData.map((comparator) => {
    return convertPercentChange(comparator);
  });
  console.log(chartData);
  ///////////////////////////////////////////////////
  //////////////// Set the Scales ///////////////////
  ///////////////////////////////////////////////////

  const xScale = d3
    .scaleTime()
    .domain(
      d3.extent(chartData[0].values, (d) => {
        return moment(d.date).valueOf();
      })
    )
    .range([0, graphWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([
      // set min
      d3.min(chartData, (d) => {
        return d3.min(d.values, (v) => {
          return v.percentChange;
        });
      }),
      // set max
      d3.max(chartData, (d) => {
        return d3.max(d.values, (v) => {
          return v.percentChange;
        });
      }),
    ])
    .range([graphHeight, 0]);

  // Initiate the line function
  const lineFunction = d3
    .line()
    .x((d) => {
      return xScale(moment(d.date).valueOf());
    })
    .y((d) => {
      return yScale(d.percentChange);
    })
    .curve(d3.curveLinear);
  // Initiate the area line function
  const areaFunction = d3
    .area()
    .x((d) => {
      return xScale(moment(d.date).valueOf());
    })
    .y0(graphHeight)
    .y1((d) => {
      return yScale(d.percentChange);
    })
    .curve(d3.curveLinear);
  ///////////////////////////////////////////////////
  ////////////// Initialize the SVG /////////////////
  ///////////////////////////////////////////////////

  // Add the svg canvas for the line chart
  const svg = d3
    .select("#isa-modeled-performance-chart")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // chart background
  svg
    .append("rect")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("fill", "#fff");

  ///////////////////////////////////////////////////
  ///////////// Create the gradient /////////////////
  ///////////////////////////////////////////////////

  // Define the gradient below the line chart
  const areaGradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "areaGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  // Append the first stop - the color at the top
  areaGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#A3A3A4")
    .attr("stop-opacity", 0.6);
  // Append the second stop - white transparant almost at the end
  areaGradient
    .append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 0);

  ///////////////////////////////////////////////////
  /////////////// Create the chart //////////////////
  ///////////////////////////////////////////////////

  // xaxis tick values
  const xAxisData = buildXTicks(moment.utc(startDate), moment.utc(endDate));
  // Generate and render the X Axis
  svg
    .append("g")
    .attr("class", "x-axis axis")
    .attr("transform", "translate(0," + graphHeight + ")")
    .call(
      d3
        .axisBottom(xScale)
        .tickValues(xAxisData.xTicks)
        .tickFormat(d3.utcFormat(xAxisData.xTickFormat))
    );
  // Generate and render the Y Axis
  svg
    .append("g")
    .attr("class", "y-axis axis")
    .call(
      d3
        .axisLeft(yScale)
        .ticks(yTicksCount)
        .tickFormat((d) => d + "%")
    );

  // Graphline generators
  const makeXGridlines = () => {
    return d3.axisBottom(xScale).tickValues(xAxisData.xTicks);
  };
  const makeYGridlines = () => {
    return d3.axisLeft(yScale).ticks(yTicksCount);
  };
  svg
    .append("g")
    .attr("class", "x-grid xGridLines")
    .attr("transform", "translate(0, " + graphHeight + ")")
    .call(makeXGridlines().tickSize(-graphHeight).tickFormat(""));
  svg
    .append("g")
    .attr("class", "y-grid yGridLines")
    .call(makeYGridlines().tickSize(-graphWidth).tickFormat(""));

  ///////////////////////////////////////////////////
  ///////////  Render the comparators ///////////////
  ///////////////////////////////////////////////////

  // Render the gradient area
  svg
    .append("g")
    .attr("class", "gradient-area-container")
    .append("path")
    .attr("class", "area gradientArea")
    .style("fill", "url(#areaGradient)")
    .attr("d", areaFunction(chartData[0].values));

  // Render the comparator lines
  const graphLines = svg.append("g").attr("class", "graph-lines-container");
  chartData.forEach((dataSet, index) => {
    const styleClass = cx("graphLine", GraphLineColors[index]);
    return graphLines
      .append("path")
      .attr("class", styleClass)
      .attr("d", lineFunction(dataSet.values));
  });

  ///////////////////////////////////////////////////
  //////////////  Mouseover Effects  ////////////////
  ///////////////////////////////////////////////////

  // Vertical line
  svg
    .append("g")
    .attr("class", "mouseLineContainer")
    .append("line")
    .attr("class", `mouse-line`)
    .style("stroke", "#a3a3a4")
    .style("stroke-width", "1px")
    .style("opacity", "0")
    .style("stroke-dasharray", "5")
    .attr("y1", 0)
    .attr("y2", graphHeight);

  // Render invisible scatter plot per comparator (for mouseover effect)
  const scatterPlot = svg.append("g").attr("class", "scatter-plot-container");
  chartData.forEach((dataSet, index) => {
    return scatterPlot
      .append("g")
      .attr("class", "scatter-plot")
      .selectAll(".dot")
      .data(dataSet.values)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => xScale(moment(d.date).valueOf()))
      .attr("cy", (d) => yScale(d.percentChange))
      .attr("class", (d) => {
        const pointIndex = _.findIndex(dataSet.values, d);
        return `scatter-point point-${pointIndex} ${GraphLineColors[index]}`;
      })
      .attr("data-dateId", (d) => d.date)
      .style("stroke-width", "1px")
      .style("fill", "#fff")
      .style("opacity", "0");
  });

  // Define Mouse in/out area
  const mouseArea = svg.append("rect").attr("class", "mouseAreaRect");

  // Define mouse event handlers
  const tooltip = d3.select(`#chart-tooltip`);
  const tooltipValue = d3.select(`#chart-tooltip-value`);

  const mouseOver = () => {
    d3.select(`.mouse-line`).style("opacity", "1");
    tooltip.style("visibility", "visible");
    showChipValue(true);
  };
  const mouseOut = () => {
    d3.select(`.mouse-line`).style("opacity", "0");
    d3.selectAll(`.scatter-point`).style("opacity", "0");
    tooltip.style("visibility", "hidden");
    showChipValue(false);
  };
  const mouseMove = (datapoint) => {
    const detectArea = d3.select(".mouseAreaRect").node();
    const d3Mouse = d3.mouse(detectArea);
    const bisect = d3.bisector((i) => i.date).left;
    const xDate = moment(xScale.invert(d3Mouse[0])).format("YYYY-MM-DD");
    const index = bisect(datapoint.values, xDate);
    const xDot = d3.select(".point-" + index).attr("cx");

    const dataPoint = chartData[0].values.find((value) => value.date === xDate);
    if (dataPoint) {
      // move vertical line
      d3.select(`.mouse-line`).attr("transform", `translate(${xDot}, 0)`);

      // Hide previous/all scatter points, but show new applicable ones
      d3.selectAll(`.scatter-point`).style("opacity", "0");
      d3.selectAll(`.scatter-point[data-dateId="${xDate}"]`).style(
        "opacity",
        "1"
      );

      //   // Set tooltip date value, and position
      const tooltipDate = moment(xDate).format("MMM DD, YYYY");
      tooltipValue.html(tooltipDate);
      const tooltipXPosition = d3Mouse[0] + 55;
      const tooltipYPosition = d3Mouse[1] + 55;
      tooltip.style("left", `${tooltipXPosition}px`);
      tooltip.style("top", `${tooltipYPosition}px`);

      //   // send percentChange values to display
      const percentChangeData = chartData.map((comparator) => {
        const findValue = comparator.values.find(
          (value) => value.date === xDate
        );
        const percentChange = findValue ? findValue.percentChange : null;
        return {
          percentChange,
          id: comparator.id,
        };
      });
      if (percentChangeData[0].percentChange !== prevPercentChange) {
        prevPercentChange = percentChangeData[0].percentChange;
        setPercentChangeData(percentChangeData);
      }
    }
  };

  // Generate mouse area with event handlers
  mouseArea
    .data(chartData)
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("mouseover", () => mouseOver())
    .on("mousemove", (d) => mouseMove(d))
    .on("mouseout", () => mouseOut());
};

export default drawModeledPerformanceGraph;
