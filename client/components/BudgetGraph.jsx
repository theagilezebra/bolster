import React from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import Goals from './Goals.jsx';
import { populateChart } from '../helpers/budgetHelpers.jsx';
const BudgetGraph = props => (
  <div>
    {/* {console.log(populateChart(props.data))}*/}
    <div >
      <Goals />
    </div>
    <Line data={populateChart(props.data)} height="450" width="900" />
  </div>
);
export default BudgetGraph;
