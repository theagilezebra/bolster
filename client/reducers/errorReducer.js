export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'SIGNUP_FAILED': {
    newState.signup = action.payload;
  }
  case 'SIGNIN_FAILED': {
    newState.signin = action.payload;
  }
  // no default case
  }
  return newState;
}
