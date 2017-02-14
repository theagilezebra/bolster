export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'FETCH_CATEGORIES_SUCCESSFUL': {
    newState.categoryData = action.payload;
    break;
  }
  case 'FETCH_CATEGORIES_FAILED': {
    console.log('Fetch categories failed.');
    break;
  }
  // no default case
  }
  return newState;
}
