import React from 'react';
import { Radar } from "react-chartjs";
import { populateChart } from '../helpers/transactionHelpers.jsx';
const TransactionChart = (props) => (
  <div className="transright">
    <Radar data={populateChart(props.data)} options={props.option} height= "450" width="900"   />
  </div>
);

export default TransactionChart;
