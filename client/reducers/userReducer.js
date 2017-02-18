import { hashHistory } from 'react-router';
import { resetState } from '../helpers/stateHelpers';

export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'SIGNIN_SUCCESSFUL':
    case 'SIGNUP_SUCCESSFUL': {
      window.localStorage.setItem('userToken', action.payload.userToken);
      const { firstName, lastName, id, email } = action.payload.userInstance;
      newState.sessionActive = true;
      newState.firstName = firstName;
      newState.lastName = lastName;
      newState.email = email;
      newState.id = id;
      hashHistory.push('/dashboard');
      break;
    }
    case 'SIGNOUT': {
      window.localStorage.removeItem('userToken');
      resetState(newState, 'user');
      hashHistory.push('/');
      break;
    }
  }
  return newState;
}
