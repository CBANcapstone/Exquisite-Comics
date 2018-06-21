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
// const provider = new firebase.auth.GoogleAuthProvider();

// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   console.log("****", provider, "#####", result)

//   var user =result.user;
//   console.log('**',user)
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

}


render(){
  return (
  <div>
    <button onClick={() => this.handleClick()}>Sign in with google</button>
  </div>)
}

}


function mapState(state) {
  return {
    loggedIn: state.loggedIn,
  };
}
function mapToProps(dispatch){
  return {
    authLogin: () => dispatch(auth())
  }
}


export default connect(mapState, mapToProps)(Home);

// export default Home
