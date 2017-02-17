export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'CREATE_BUDGET_SUCCESSFUL': {
    newState.budgetData = action.payload;
    break;
  }
  case 'CREATE_BUDGET_FAILED': {
    console.log('Create budget failed.');
    break;
  }
  case 'FETCH_BUDGETS_SUCCESSFUL': {
    newState.budgetData = action.payload;
    break;
  }
  case 'FETCH_BUDGETS_FAILED': {
    console.log('Fetch budgets failed.');
    break;
  }
  }
  return newState;
}
