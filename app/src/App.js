import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import DisplayChip from './DisplayChip';
import LineGraph from './LineGraph/LineGraph';

import data from './mockData.js';
import colors from './colors.js';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <div id="display-chip-container">
          {data.map((comparator, index) => {
            return (
              <DisplayChip
                key={comparator.id}
                id={comparator.id}
                label={comparator.key}
                color={colors[index]}
              />
            );
          })}
        </div>
        <div id="chart-container">
          <LineGraph />
        </div>
      </div>
    );
  }
}

export default App;
