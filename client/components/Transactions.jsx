import React from 'react';
import TransactionChart from './TransactionChart.jsx';
import TransactionTable from './TransactionTable.jsx';
import NavBar from './NavBar.jsx';
const Transactions = props => (
  <div>
    <NavBar />
    <div className="container centertext topmargin">
      <div className="row ">
        <div className="col-md-12" >
          <TransactionChart data={props.data} />
        </div>
      </div>
    </div>
    <div className="container topmargin">
      <div className="row">
        <div className="col-md-12">
          <TransactionTable data={props.data} />
        </div>
      </div>
    </div>
  </div>
);

export default Transactions;
