import React from 'react';
import css from 'react-bootstrap';
import { mapAndRender } from '../helpers/transactionHelpers.jsx';

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
          {mapAndRender(props.data)}
        </tbody>
      </table>
    </div>
  </div>
);

export default TransactionTable;
