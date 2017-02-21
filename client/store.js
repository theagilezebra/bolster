import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import { defaultState } from './helpers/stateHelpers';

const middleware = applyMiddleware(logger(), thunk);

export default createStore(reducer, defaultState, middleware);
