import React from 'react';
import logo from './logo.svg';
import './App.css';

import './line-graph.scss';

import data from './mockData.js';

import drawModeledPerformanceGraph from './line-graph.generator';

class App extends React.Component {
  showChipValue(){
    console.log('show chip value')
  }

  setPercentChangeData(){
    console.log('set percent changeData')
  }

  componentDidMount(){
    drawModeledPerformanceGraph(
      data,
      '2019-04-01',
      '2019-10-02',
      this.showChipValue,
      this.setPercentChangeData
    )
  }

  render() {
    return (
      <div className="App">
        <div className="test">test
          <svg id="isa-modeled-performance-chart"></svg>
        </div>
      </div>
    );
  }
}

export default App;
