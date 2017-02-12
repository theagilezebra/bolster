export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'LINK_ACCOUNT_SUCCESSFUL': {
    newState.accountData = action.payload;
    break;
  }
  case 'LINK_ACCOUNT_FAILED': {
    console.log('Link account failed.');
    break;
  }
  // no default case
  }
  return newState;
}
