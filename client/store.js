import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
// change this back to combined reducers, just a temporary hack to get radardata and linedata to redux
// import reducer from './reducers/userReducer.js';
const middleware = applyMiddleware(logger(), thunk);
const mySpending = [1200, 180, 200, 125, 800];
const myBudget = mySpending.map((item)=>{return item * .9})
const defaultState = {
    chartdata: {
        labels: ["Utilities","Food And Drink","Healthcare", "Car Payment", "Mortgage"],
        datasets: [
            {
            data: mySpending,
            fillColor: "#90EE90"
            }, 
            {
            data: myBudget,
            fillColor: "#2E8B57",
            }
        ]
      },
};
export default createStore(reducer, defaultState, middleware);

