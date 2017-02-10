import React from 'react';
import TransactionChart from './TransactionChart.jsx';
import TransactionTable from './TransactionTable.jsx';

const Transactions = props => ( // all transactions linked to a user
  <div>
    <TransactionChart />
    <TransactionTable />
  </div>
);

export default Transactions;
