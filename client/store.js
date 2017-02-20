import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

import { defaultState } from './helpers/stateHelpers';

const middleware = applyMiddleware(logger(), thunk);
const defaultState = {
  render: {
    signForm: 'Signup',
  },

  goals: {
    user_id: null,
    date: null,
    name: null,
    amount: null,
  },

  user: {
    sessionActive: null,
    id: 1,
  },
  error: {
    signup: '',
    signin: '',
  },
  accounts: {
    accountData: [],
  },
  transactions: {
    transactionsData: [],
  },
};

export default createStore(reducer, defaultState, middleware);
