import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
// change this back to combined reducers, just a temporary hack to get radardata and linedata to redux
// import reducer from './reducers/userReducer.js';
const middleware = applyMiddleware(logger(), thunk);
const defaultState = {
  render: {
    signForm: 'Signup',
  },
  user: {
    sessionActive: null,
    id: null,
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
