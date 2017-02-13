import React from 'react';
import TransactionChart from './TransactionChart.jsx';
import TransactionTable from './TransactionTable.jsx';

const Transactions = props => ( 
  <div className="topmargin">
    <section className="transcontainer">
      <TransactionChart data={props.data} />
      <TransactionTable  data={props.data} />
    </section>
  </div>
);

export default Transactions;
