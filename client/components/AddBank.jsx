import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { linkAccounts } from '../actions/accountActions';
import { requestTransactions, fetchTransactions } from '../actions/transActions';

<<<<<<< 1ccf4fe5a80e8ccc41c4af086d48c9467f71bfc3
const AddBank = ({ accounts, transactions, dispatch }) => {
=======
const AddBank = ({ id, accounts, transactions, dispatch, error }) => {
  const { accountData, accountStatus } = accounts;
>>>>>>> Add error message if link fails.
  const handleOnSuccess = (public_token, metadata) => {
    dispatch(linkAccounts({ public_token, institutionName: metadata.institution.name }));
  };

  const renderTransactions = () => {
    dispatch(requestTransactions()).then(() => dispatch(fetchTransactions()));
  };

  return (
    <div>
      <PlaidLink
        publicKey="test_key"
        product="connect"
        env="tartan"
        clientName="Bolster"
        onSuccess={handleOnSuccess}
      />
      <div>
        {accounts.map(account => (
          <div>
            <span>Account: {account.name} ..... Balance: {account.currentBalance}</span>
          </div>
        ))}
      </div>
      <div>
        {transactions.map(transaction => (
          <div>
            <span>Transaction: {transaction.name} ..... Amount: {transaction.amount}</span>
          </div>
        ))}
      </div>
      <p className="error-message">{error}</p>
      <button onClick={() => { renderTransactions(); }}>GET TRANSACTIONS</button>
    </div>
  );
};

export default connect(state => ({
  accounts: state.accounts.accountData,
  id: state.user.id,
  error: state.error.link,
  transactions: state.transactions.transactionsData,
}))(AddBank);
