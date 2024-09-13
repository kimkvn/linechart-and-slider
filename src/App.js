import logo from "./logo.svg";
import "./App.css";

import DisplayChip from "./DisplayChip";
import LineGraph from "./LineGraph/LineGraph";
import data from "./mockData.js";
import colors from "./colors.js";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  return (
    <div id="app">
      <div id="title">
        <h1>Modeled Performance</h1>
      </div>
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
      <div id="description">
        <h5>A multi-line chart built with D3, React, and Redux.</h5>
        <h5>
          Built by <a href="https://www.linkedin.com/in/kimkvn/">K Kim</a>
        </h5>
      </div>
    </div>
  );
}

export default App;
