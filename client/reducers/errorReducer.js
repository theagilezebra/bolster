import { resetState } from '../helpers/stateHelpers';

export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'SIGNUP_FAILED': {
    newState.signup = action.payload;
    break;
  }
  case 'SIGNIN_FAILED': {
    newState.signin = action.payload;
    break;
  }
  case 'LINK_ACCOUNTS_FAILED': {
    newState.addBank = action.payload;
    break;
  }
  case 'ADDRESS_REQUIRED': {
    newState.address = action.payload;
    break;
  }
  case 'UPDATE_USER_FAILED': {
    newState.email = action.payload;
    break;
  }
  case 'RESET_ERRORS': {
    resetState(newState, state.error);
    break;
  }
  case 'UPDATE_ADDRESS_SUCCESSFUL':
  case 'UPDATE_USER_SUCCESSFUL': {
    debugger;
    newState.profileUpdated = 'Profile updated';
    break;
  }
  }
  return newState;
}
