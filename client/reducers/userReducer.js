import { hashHistory } from 'react-router';
import { resetState } from '../helpers/stateHelpers';
import decorateState from '../helpers/userHelpers';

export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'AUTH_SUCCESSFUL': {
      decorateState(newState, action.payload.userInstance || action.payload);
      if (document.location.hash === '#/') {
        hashHistory.push('/dashboard');
      }
      break;
    }
    case 'SIGNIN_SUCCESSFUL':
    case 'SIGNUP_SUCCESSFUL': {
      window.localStorage.setItem('userToken', action.payload.userToken);
      decorateState(newState, action.payload.userInstance || action.payload);
      hashHistory.push('/dashboard');
      break;
    }
    case 'SIGNOUT': {
      window.localStorage.removeItem('userToken');
      hashHistory.push('/');
      break;
    }
  }
  return newState;
}
