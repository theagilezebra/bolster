import axios from 'axios';

export function linkAccount(data) {
  return dispatch => axios.post('/api/budgets/create', data)
    .then((response) => {
      dispatch({ type: 'CREATE_BUDGET_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_BUDGET_FAILED', payload: err.response });
    });
}

export function fetchAccounts() {
  return dispatch => axios.get('/api/accounts')
    .then((response) => {
      dispatch({ type: 'FETCH_BUDGETS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_BUDGETS_FAILED', payload: err.response });
    });
}
