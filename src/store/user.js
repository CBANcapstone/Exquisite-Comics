import * as firebase from 'firebase';



const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

//Action creators
export const login = user => ({ type: LOGIN, user });
export const logout = user => ({ type: LOGOUT, user });

//Thunk creators
export const auth = () => dispatch => {
  const provider = new firebase.auth.GoogleAuthProvider();
  console.log("****", provider)

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    console.log("****", provider, "#####", result)

    dispatch(login(result.user));
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}

export default function( state={}, action){
  switch (action.type){
    case LOGIN:
      return action.user
    default:
    return state
  }
}

