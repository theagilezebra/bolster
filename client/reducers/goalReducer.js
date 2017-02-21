export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'CREATE_GOAL_SUCCESSFUL': {
      const newData = newState.goalsData.slice();
      newData.push(action.payload);
      newState.goalsData = newData;
      break;
    }
    case 'CREATE_GOAL_FAILED': {
      console.log('Create goal failed.');
      break;
    }
    case 'FETCH_GOALS_SUCCESSFUL': {
      newState.goalsData = action.payload.slice();
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
  }
  return newState;
}
