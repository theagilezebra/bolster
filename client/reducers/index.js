import { combineReducers } from 'redux';
import user from './userReducer';
import accounts from './accountReducer';
import transactions from './transReducer';
import businesses from './businessReducer';
import budgets from './budgetReducer';
import goals from './goalReducer';
import categories from './categoryReducer';
import render from './renderReducer';
import error from './errorReducer';

const appReducer = combineReducers({
  user,
  accounts,
  transactions,
  businesses,
  budgets,
  goals,
  categories,
  render,
  error,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

