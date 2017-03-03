import { convertBalances } from '../helpers/accountHelpers.jsx';

export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'LINK_ACCOUNTS_SUCCESSFUL': {
    newState.accountData = action.payload;
    break;
  }
  case 'LINK_ACCOUNTS_FAILED': {
    console.log('Link accounts failed.');
    break;
  }
  case 'FETCH_ACCOUNTS_SUCCESSFUL': {
    newState.accountData = convertBalances(action.payload);
    break;
  }
  case 'FETCH_ACCOUNTS_FAILED': {
    console.log('Fetch accounts failed.');
    break;
  }
  case 'DELETE_INSTITUTION_SUCCESSFUL': {
    newState.accountData = newState.accountData.filter(account => !account.institutionName === action.payload);
    break;
  }
  }
  return newState;
}
