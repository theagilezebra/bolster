import React from 'react';
import { connect } from 'react-redux';
import { renderAccounts } from '../helpers/accountHelpers.jsx';

const AccountTable = ({ accounts }) => (
  <div className="quicksand">
    <div className="container">
      <h3 className="quicksand centertext">Your Linked Accounts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Available</th>
            <th>Current</th>
            <th>Type</th>
            <th>Institution</th>
          </tr>
        </thead>
        <tbody>
          {renderAccounts(accounts)}
        </tbody>
      </table>
    </div>
  </div>
);

export default connect(state => ({
  accounts: state.accounts.accountData,
}))(AccountTable);
