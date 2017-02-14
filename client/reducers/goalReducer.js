export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'CREATE_GOAL_SUCCESSFUL': {
    newState.goalData = action.payload;
    break;
  }
  case 'CREATE_GOAL_FAILED': {
    console.log('Create goal failed.');
    break;
  }
  case 'FETCH_GOALS_SUCCESSFUL': {
    newState.goalData = action.payload;
    break;
  }
  case 'FETCH_GOALS_FAILED': {
    console.log('Fetch goals failed.');
    break;
  }
  case 'UPDATE_GOAL_SUCCESSFUL': {
    newState.goalData = action.payload;
    break;
  }
  case 'UPDATE_GOAL_FAILED': {
    console.log('Update goal failed.');
    break;
  }
  // no default
  }
  return newState;
}
