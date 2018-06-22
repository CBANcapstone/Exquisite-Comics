import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import Home from './components/Home';
import { Home } from './components';
import Canvas from './components/canvas/Canvas'
// import { getUserThunk } from './store';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Home} />
        <Route path="/canvas" component={Canvas} />
      </Switch>
    );
  }
}

export default App;
