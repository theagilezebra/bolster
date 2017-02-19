import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { linkAccounts, fetchAccounts } from '../actions/accountActions';

const AddBank = ({ id, accounts, dispatch }) => {
  const handleOnSuccess = (public_token, metadata) => {
    dispatch(linkAccounts({ id, public_token, institutionName: metadata.institution.name })).then(() => {
      dispatch(fetchAccounts(id));
    });
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
    </div>
  );
};

export default connect(state => ({
  id: state.user.id,
  accounts: state.accounts.accountData,
}))(AddBank);
