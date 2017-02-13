import React from 'react';
import { Line } from 'react-chartjs'
import Goals from './Goals.jsx'
const BudgetGraph = props => (
  <div>
    <Goals />
    <Line data={props.data} height="450" width="900"/>
  </div>
);

export default BudgetGraph;
