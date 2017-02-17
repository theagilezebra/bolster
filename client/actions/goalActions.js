import axios from 'axios';


export function createGoal(data) { // create a single goal
  return dispatch => axios.post('/api/goals/create', data)
    .then((response) => {
      dispatch({ type: 'CREATE_GOAL_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_GOAL_FAILED', payload: err });
    });
}

export function fetchGoals({ user_id }) { // provide all goals specific to user
  return dispatch => axios.get(`/api/goals?user_id=${user_id}`)
    .then((response) => {
      dispatch({ type: 'FETCH_GOALS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_GOALS_FAILED', payload: err });
    });
}

export function updateGoal(data) { // update a single goal
  return dispatch => axios.put('/api/goals/update', data)
    .then((response) => {
      dispatch({ type: 'UPDATE_GOAL_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_GOAL_FAILED', payload: err });
    });
}
