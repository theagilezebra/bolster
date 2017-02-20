import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { linkAccounts, fetchAccounts } from '../actions/accountActions';
import { fetchTransactions } from '../actions/transActions';

const AddBank = ({ id, accounts, transactions, dispatch }) => {
  const { accountData, accountStatus } = accounts;
  const handleOnSuccess = (public_token, metadata) => {
    dispatch(linkAccounts({ id, public_token, institutionName: metadata.institution.name }));
  };

  const renderTransactions = () => {
    dispatch(fetchTransactions(id));
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
      <br />
      <span onClick={() => { renderTransactions(); }} >{accountStatus}</span>
      <div>
        {accountData.map(account => (
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
    </div>
  );
};

export default connect(state => ({
  id: state.user.id,
  accounts: state.accounts,
  transactions: state.transactions.transactionsData,
}))(AddBank);
