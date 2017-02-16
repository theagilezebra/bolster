import axios from 'axios';

export function signinOrSignup(credentials) {
  return dispatch => axios.post('/api/users', credentials)
    .then((response) => {
      dispatch({ type: `SIGN${response.status === 201 ? 'IN' : 'UP'}_SUCCESSFUL`, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNIN_OR_SIGNUP_FAILED', payload: err });
    });
}

export function signout() {
  return dispatch => dispatch({ type: 'SIGNOUT' });
}

// export function checkAuth() {

// }
