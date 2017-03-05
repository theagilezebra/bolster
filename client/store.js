import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import { defaultState } from './helpers/stateHelpers';

let middleware;

if (location.href.indexOf('://localhost')) {
  middleware = applyMiddleware(logger(), thunk);
} else {
  middleware = applyMiddleware(thunk);
}

export default createStore(reducer, defaultState, middleware);
