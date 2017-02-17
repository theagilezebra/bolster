export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'SIGNIN_SUCCESSFUL':
  case 'SIGNUP_SUCCESSFUL': {
    const { firstName, lastName, id, email } = action.payload;
    newState.sessionActive = true;
    newState.firstName = firstName;
    newState.lastName = lastName;
    newState.email = email;
    newState.id = id;
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
