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
  case 'SIGNOUT': {
    newState.sessionActive = false;
    break;
  }
  default:
    return state;
  }
  return newState;
}
