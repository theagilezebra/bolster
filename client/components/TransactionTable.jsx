import React from 'react';
<<<<<<< ff9234de2075d0a357c4992f04b0bc7588108b38

=======
>>>>>>> remove import of bootstrap
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
