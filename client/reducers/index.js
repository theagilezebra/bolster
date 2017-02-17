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

export default combineReducers({
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
