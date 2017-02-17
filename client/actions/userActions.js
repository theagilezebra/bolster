import axios from 'axios';

export function signin(credentials) {
  return dispatch => axios.post('/api/users/signin', credentials)
    .then((response) => {
      dispatch({ type: 'SIGNIN_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNIN_FAILED', payload: 'incorrect username or password' });
    });
}

export function signup(credentials) {
  return dispatch => axios.post('/api/users/signup', credentials)
    .then((response) => {
      dispatch({ type: 'SIGNUP_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_FAILED', payload: 'email already in use' });
    });
}

export function signout() {
  return dispatch => dispatch({ type: 'SIGNOUT' });
}

// export function checkAuth() {

// }
