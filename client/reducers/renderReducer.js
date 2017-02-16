export default function reducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'RENDER_FORM': {
    newState.signForm = action.payload;
    break;
  }
  // no default
  }
  return newState;
}
