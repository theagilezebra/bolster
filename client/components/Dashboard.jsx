import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavBar.jsx';
import AddBank from './AddBank.jsx';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar landing={false} />
        <h1>Add a bank account!</h1>
        <AddBank />
      </div>
    );
  }
}

export default connect(state => ({
  accounts: state.accounts.accountData,
}))(Dashboard);
