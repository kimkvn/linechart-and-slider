import React from 'react';
import './App.css';

import DisplayChip from './DisplayChip';
import LineGraph from './LineGraph/LineGraph';

import data from './mockData.js';

import drawModeledPerformanceGraph from './LineGraph/line-graph.generator';

class App extends React.Component {
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
      <div id="app">
        <div id="display-chip-container">
          <DisplayChip />
          <DisplayChip />
        </div>
        <div id="chart-container">
          <LineGraph />
        </div>
      </div>
    );
  }
}

export default App;
