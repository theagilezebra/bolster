import React from 'react';
import { Line } from 'react-chartjs'

const BudgetGraph = props => (
  <div>
    <Line data={props.data} height="450" width="900"/>
  </div>
);

export default BudgetGraph;
