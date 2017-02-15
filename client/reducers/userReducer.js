export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'SIGNIN_OR_SIGNUP_SUCCESSFUL': {
    newState.sessionActive = true;
    newState.userData = action.payload;
    break;
  }
  case 'SIGNIN_OR_SIGNUP_FAILED': {
    console.log('Signin or signup failed.');
    break;
  }
  case 'SIGNOUT': {
    newState.sessionActive = false;
    break;
  }
  // no default case
  }
  return newState;
}
