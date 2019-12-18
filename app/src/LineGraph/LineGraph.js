import React from 'react';

import './line-graph.scss';

import data from '../mockData.js';

import drawModeledPerformanceGraph from './line-graph.generator';

class LineGraph extends React.Component {
  showChipValue() {
    console.log('show chip value');
  }

  setPercentChangeData() {
    console.log('set percent changeData');
  }

  componentDidMount() {
    drawModeledPerformanceGraph(
      data,
      '2018-12-17',
      '2019-12-16',
      this.showChipValue,
      this.setPercentChangeData
    );
  }

  render() {
    return (
      <>
        <svg id="isa-modeled-performance-chart"></svg>
        <div id="chart-tooltip">
          <span id="chart-tooltip-value"></span>
        </div>
      </>
    );
  }
}

export default LineGraph;
