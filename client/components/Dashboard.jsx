import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import NavigationBar from './NavBar.jsx';
import AddBank from './AddBank.jsx';

class Dashboard extends React.Component {

  budgetHandler(e) {
    e.preventDefault();
    hashHistory.push('/budgetchart');
  }

  transactionHandler(e) {
    e.preventDefault();
    hashHistory.push('/transactions');
  }

  render() {
    return (
      <div>
        <NavigationBar landing={false} />
        <div className="dashboardtext">
          <div className="dashboardjumbo dashboardone" onClick={this.budgetHandler}>Budget</div>
          <div className="dashboardjumbo dashboardtwo" onClick={this.transactionHandler}>Transactions</div>
          <div className="dashboardjumbo dashboardthree">
            <AddBank />
            <h2>Add a bank account!</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Dashboard);
