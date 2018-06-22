import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserThunk } from './store';
import './App.css';
import { CanvasB, Home, Navbar, UserProfile } from './components';
import Canvas from './components/canvas/Canvas';
import firebase, { auth } from './config/firebase';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user);
      }
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Home} />
          <Route path="/canvas" component={Canvas} />
          <Route path="/userProfile" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: user => dispatch(getUserThunk(user))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
);
