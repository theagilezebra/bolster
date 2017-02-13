import React from 'react';
import { Radar } from "react-chartjs";
import TransactionTable from './TransactionTable.jsx';
const TransactionChart = (props) => (
  <div className="transright">
    <Radar data={props.data} options={props.option} height= "450" width="900"   />
  </div>
);

export default TransactionChart;
