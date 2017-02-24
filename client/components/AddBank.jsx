import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { linkAccounts } from '../actions/accountActions';
import { requestTransactions, fetchTransactions } from '../actions/transActions';

const AddBank = ({ id, accounts, transactions, dispatch, error }) => {
  const { accountData, accountStatus } = accounts;
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
  error: state.error.addBank,
  transactions: state.transactions.transactionsData,
}))(AddBank);
