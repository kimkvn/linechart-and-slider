import React from 'react';
import { connect } from 'react-redux';
import './line-graph.scss';

import data from '../mockData.js';

import drawModeledPerformanceGraph from './line-graph.generator';
import { showValues, setPercentChangeValues } from '../actions';

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.showChipValue = this.showChipValue.bind(this);
    this.setPercentChangeValues = this.setPercentChangeValues.bind(this);
  }

  showChipValue(flag) {
    this.props.showChipValue(flag);
  }

  setPercentChangeValues(percentChangeData) {
    this.props.setPercentChangeValues(percentChangeData);
  }

  componentDidMount() {
    drawModeledPerformanceGraph(
      data,
      '2018-12-17',
      '2019-12-16',
      this.showChipValue,
      this.setPercentChangeValues
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
    showChipValue: flag => dispatch(showValues(flag)),
    setPercentChangeValues: data => dispatch(setPercentChangeValues(data))
  };
};

export default connect(null, mapDispatchToProps)(LineGraph);
