export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'CREATE_CATEGORY_SUCCESSFUL': {
      newState.categoryData = action.payload;
      break;
    }
    case 'CREATE_CATEGORY_FAILED': {
      console.log('Create category failed.');
      break;
    }
    case 'FETCH_CATEGORIES_SUCCESSFUL': {
      newState.categoryData = action.payload;
      break;
    }
    case 'FETCH_CATEGORIES_FAILED': {
      console.log('Fetch categories failed.');
      break;
    }
  }
  return newState;
}
