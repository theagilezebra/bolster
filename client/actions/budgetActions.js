import axios from 'axios';
import { getUserId } from '../helpers/stateHelpers';

export function createBudget(data) {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return dispatch => axios.post('/api/budgets/create', data, { headers })
    .then((response) => {
      dispatch({ type: 'CREATE_BUDGET_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_BUDGET_FAILED', payload: err.response });
    });
}

export function fetchBudgets() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => axios.get(`/api/budgets?user_id=${getUserId(getState)}`, { headers })
    .then((response) => {
      dispatch({ type: 'FETCH_BUDGETS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_BUDGETS_FAILED', payload: err.response });
    });
}
