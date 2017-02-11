import React from 'react';
import { Radar } from "react-chartjs";

const TransactionChart = (props) => (
  <div>
    <Radar data={props.data} options={props.option} height= "450" width="900"   />
  </div>
);

export default TransactionChart;
