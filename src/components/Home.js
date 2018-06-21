import React, { Component } from 'react';
import { connect } from 'react-redux';
import {auth} from '../store';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase';
firebase.initializeApp(firebaseConfig);



class Home extends Component {
constructor(props){
  super(props)

}


handleClick = event => {
this.props.authLogin()
}


render(){
  return (
  <div>
    <button onClick={() => this.handleClick()}>Sign in with google</button>
    <label>Hello, {this.props.user.displayName}</label>
  </div>)
}

}


function mapState(state) {
  return {
    user: state.user,
  };
}
function mapToProps(dispatch){
  return {
    authLogin: () => dispatch(auth())
  }
}


export default connect(mapState, mapToProps)(Home);

