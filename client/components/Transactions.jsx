import React from 'react';
import { connect } from 'react-redux';
import TransactionChart from './TransactionChart.jsx';
import TransactionTable from './TransactionTable.jsx';
import NavigationBar from './NavBar.jsx';
import { requestTransactions, fetchTransactions } from '../actions/transActions';

class Transactions extends React.Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(requestTransactions()).then(() => dispatch(fetchTransactions()));
  }

  render() {
    return (
      <div>
        <NavigationBar landing={false} />
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
  }
}

export default connect(null)(Transactions);
