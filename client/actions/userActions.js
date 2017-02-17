import axios from 'axios';

export function signin(credentials) {
  return dispatch => axios.post('/api/users/signin', credentials)
    .then((response) => {
      dispatch({ type: 'SIGNIN_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNIN_FAILED', payload: err });
    });
}

export function signup(credentials) {
  return dispatch => axios.post('/api/users/signup', credentials)
    .then((response) => {
      dispatch({ type: 'SIGNUP_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_FAILED', payload: err });
    });
}

export function signout() {
  return dispatch => dispatch({ type: 'SIGNOUT' });
}

// export function checkAuth() {

// }
