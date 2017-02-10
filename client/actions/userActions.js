import axios from 'axios';

export function signinOrSignup({ email, password }) {
  return dispatch => axios.post('/api/users', email, password)
    .then((response) => {
      const payload = // define payload;
      dispatch({ type: `SIGN${response.status === 201 ? 'IN' : 'UP'}_SUCCESSFUL`, payload });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNIN_OR_SIGNUP_FAILED', payload });
    });
}

export const signout = { type: 'SIGNOUT' };

// export function checkAuth() {

// }
