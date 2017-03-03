import { hashHistory } from 'react-router';
import { decorateState, bootUser } from '../helpers/userHelpers';

export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'UPDATE_ADDRESS_SUCCESSFUL':
  case 'UPDATE_USER_SUCCESSFUL': {
    decorateState(newState, action.payload.userInstance || action.payload, state);
    break;
  }
  case 'UPDATE_USER_FAILED': {
    console.error(action.payload);
    break;
  }
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
    bootUser();
    break;
  }
  case 'DELETE_USER_SUCCESSFUL': {
    bootUser();
    break;
  }
  }
  return newState;
}
