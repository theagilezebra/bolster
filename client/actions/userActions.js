import axios from 'axios';
import { getUserId } from '../helpers/stateHelpers';

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

export function checkAuth() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return dispatch => axios.get('api/users/auth', { headers })
    .then((response) => {
      dispatch({ type: 'AUTH_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNOUT', payload: err });
    });
}

export function update(userInfo) {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => axios.put(`api/users/${getUserId(getState)}`, userInfo, { headers })
    .then((response) => {
      dispatch({ type: 'UPDATE_USER_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_USER_FAILED', payload: err });
    });
}

export function updateAddress(address) {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return dispatch => axios.post('api/addresses', address, { headers })
    .then((response) => {
      dispatch({ type: 'UPDATE_ADDRESS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_ADDRESS_FAILED', payload: err });
    });
}
