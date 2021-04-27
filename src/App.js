import React, { Component } from 'react';
import './App.css';
import Board from "./Board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Sliding Puzzle Game
          <Board/>
            <h4 id="grad1">umerkazi™</h4>
        </header>
      </div>
    );
  }
}

export default App;
