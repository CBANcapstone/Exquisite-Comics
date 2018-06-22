import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';


import {CanvasB} from './components/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CanvasB />
        <Home />
      </div>
    );
  }
}

export default App;
