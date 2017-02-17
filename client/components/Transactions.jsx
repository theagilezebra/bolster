import React from 'react';
import TransactionChart from './TransactionChart.jsx';
import TransactionTable from './TransactionTable.jsx';
import NavBar from './NavBar.jsx';

const Transactions = props => (
  <div>
    <NavBar landing={false} />
    <div className="container centertext topmargin">
      <div className="row ">
        <div className="col-md-12" >
          <TransactionChart />
        </div>
      </div>
    </div>
    <div className="container topmargin">
      <div className="row">
        <div className="col-md-12">
          <TransactionTable />
        </div>
      </div>
    </div>
  </div>
);

export default Transactions;
