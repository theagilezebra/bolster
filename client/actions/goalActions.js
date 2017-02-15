import axios from 'axios';

export function createGoal({ userId }) { // create a single goal
  return dispatch => axios.post(`/api/goals/create?user_id=${userId}`)
    .then((response) => {
      dispatch({ type: 'CREATE_GOAL_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_GOAL_FAILED', payload: err });
    });
}

export function fetchGoals({ userId }) { // provide all goals specific to user
  return dispatch => axios.get(`/api/goals?user_id=${userId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_GOALS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_GOALS_FAILED', payload: err });
    });
}

export function updateGoal({ userId, goalId }) { // update a single goal
  return dispatch => axios.put(`/api/goals?user_id=${userId}?goal_id=${goalId}`)
    .then((response) => {
      dispatch({ type: 'UPDATE_GOAL_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_GOAL_FAILED', payload: err });
    });
}

