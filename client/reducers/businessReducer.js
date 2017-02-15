export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'FETCH_BUSINESSES_SUCCESSFUL': {
    newState.businessData = action.payload;
    break;
  }
  case 'FETCH_BUSINESSES_FAILED': {
    console.log('Fetch businesses failed.');
    break;
  }
  // no default case
  }
  return newState;
}
