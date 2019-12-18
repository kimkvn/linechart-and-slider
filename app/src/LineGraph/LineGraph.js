import React from 'react';
import { connect } from 'react-redux';
import './line-graph.scss';

import data from '../mockData.js';

import drawModeledPerformanceGraph from './line-graph.generator';
import { showValues } from '../actions';

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.showChipValue = this.showChipValue.bind(this);
  }

  showChipValue(flag) {
    this.props.showChipValue(flag);
  }

  setPercentChangeData(percentChangeData) {
    // console.log('set percent changeData', percentChangeData);
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

export const mapDispatchToProps = dispatch => {
  return {
    showChipValue: flag => dispatch(showValues(flag))
  };
};

export default connect(null, mapDispatchToProps)(LineGraph);
