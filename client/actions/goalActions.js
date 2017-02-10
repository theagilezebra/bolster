import axios from 'axios';

export function createGoal(/*user_id*/) { // create a single goal
  return dispatch => axios.post('/api/goals', /*user_id*/)
    .then((response) => {
      dispatch({ type: 'CREATE_GOAL_SUCCESSFUL', payload: 'fillmein'/* expecting data*/ });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_GOAL_FAILED', payload: err });
    });
}

export function fetchGoals(/*user_id*/) { // provide all goals specific to user
  return dispatch => axios.get('/api/goals', /*user_id*/)
    .then((response) => {
      dispatch({ type: 'FETCH_GOALS_SUCCESSFUL', payload: 'fillmein'/* expecting data*/ });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_GOALS_FAILED', payload: err });
    });
}

export function updateGoal(/*user_id, goal_id*/) { // update a single goal
  return dispatch => axios.put('/api/goals', /*user_id, goal_id*/)
    .then((response) => {
      dispatch({ type: 'UPDATE_GOAL_SUCCESSFUL', payload: 'fillmein'/* expecting data*/ });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_GOAL_FAILED', payload: err });
    });
}

// maybe allow users to delete goals?
// 'After thinking about it, I don't need those Vintage Elvis Presley socks after all.'
