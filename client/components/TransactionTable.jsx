import React from 'react';
import css from 'bootstrap'
const TransactionTable = props => (
  
  <div className="transleft">
  <div className="container">
    <table className="table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Spent</th>
          <th>Budget</th>
          <th>Over/Under</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.data.labels[0]}</td>
          <td>{props.data.datasets[0].data[0]}</td>
          <td>{props.data.datasets[1].data[0]}</td>
          <td>{props.data.datasets[0].data[0] - props.data.datasets[1].data[0] }</td>
        </tr>
        <tr>
          <td>{props.data.labels[1]}</td>
          <td>{props.data.datasets[0].data[1]}</td>
          <td>{props.data.datasets[1].data[1]}</td>
          <td>{props.data.datasets[0].data[1] - props.data.datasets[1].data[1] }</td>
        </tr>
        <tr>
          <td>{props.data.labels[2]}</td>
          <td>{props.data.datasets[0].data[2]}</td>
          <td>{props.data.datasets[1].data[2]}</td>
          <td>{props.data.datasets[0].data[2] - props.data.datasets[1].data[2] }</td>
        </tr>
        <tr>
          <td>{props.data.labels[3]}</td>
          <td>{props.data.datasets[0].data[3]}</td>
          <td>{props.data.datasets[1].data[3]}</td>
          <td>{props.data.datasets[0].data[3] - props.data.datasets[1].data[3] }</td>
        </tr>
        <tr>
          <td>{props.data.labels[4]}</td>
          <td>{props.data.datasets[0].data[4]}</td>
          <td>{props.data.datasets[1].data[4]}</td>
          <td>{props.data.datasets[0].data[4] - props.data.datasets[1].data[4] }</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
);

export default TransactionTable;
