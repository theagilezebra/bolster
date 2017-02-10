import React from 'react';
import TransactionChart from './TransactionChart.jsx';
import TransactionTable from './TransactionTable.jsx';

const Transactions = props => ( // all transactions linked to a user
  <div>
    <TransactionTable />
    <TransactionChart />
  </div>
);

export default Transactions;
