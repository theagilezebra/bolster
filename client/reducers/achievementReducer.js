export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'FETCH_ACHIEVEMENTS_SUCCESSFUL': {
      debugger;
      newState.achievementsData = action.payload;
      break;
    }
    case 'FETCH_ACHIEVEMENTS_FAILED': {
      console.error('Fetch accounts failed', action.payload);
      break;
    }
  }
  return newState;
}
