import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import reducer from './reducers/index';
//change this back to combined reducers, just a temporary hack to get radardata and linedata to redux
import reducer from './reducers/userReducer.js'
const middleware = applyMiddleware(logger(), thunk);
const defaultState = {
    radardata: {
        labels: ["Utilities","Food And Drink","Healthcare", "Car Payment", "Mortgage"],
        datasets: [{
        data: [300, 180, 200, 125, 800],
        fillColor: "#2ECC71"
        }, 
        {
        data: [500, 100, 30, 100, 600],
        fillColor: "#EFD002",
        pointBackgroundColor: "#9B59B6"
        }]
      },
    linedata: {
        labels: ["Utilities","Food And Drink","Healthcare", "Car Payment", "Mortgage"],
        datasets: [{
        data: [300, 180, 200, 125, 800],
        }]
    }
};
export default createStore(reducer, defaultState, middleware);
