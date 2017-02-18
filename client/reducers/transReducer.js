import { resetState } from '../helpers/stateHelpers';

export default function (state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'FETCH_TRANSACTIONS_SUCCESSFUL': {
    newState.transData = action.payload;
    break;
  }
  case 'FETCH_TRANSACTIONS_FAILED': {
    console.log('FETCH_TRANSACTIONS_FAILED');
    break;
  }
  case 'SIGNOUT': {
    resetState(newState, 'transactions');
    break;
  }
  }
  return newState;
}
