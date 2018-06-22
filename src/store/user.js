import { auth, provider } from '../config/firebase';

const GET_USER = 'GET_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

//Action creators
export const login = user => ({ type: LOGIN, user });
export const logout = user => ({ type: LOGOUT, user });
export const getUser = user => ({ type: GET_USER, user });

//Thunk creators
export const loginThunk = () => dispatch => {
  auth.signInWithPopup(provider).then(result => {
    dispatch(login(result.user));
  });
};

export const logoutThunk = () => dispatch => {
  auth.signOut().then(() => {
    dispatch(logout(null));
  });
};

export const getUserThunk = user => dispatch => {
  dispatch(getUser(user));
};

export default function(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return action.user;
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
