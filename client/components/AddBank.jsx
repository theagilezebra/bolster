import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { linkAccounts } from '../actions/accountActions';

const AddBank = ({ id, dispatch }) => {
  const handleOnSuccess = (public_token, metadata) => {
    dispatch(linkAccounts({ id, public_token, institutionName: metadata.institution.name }));
  };

  return (
    <PlaidLink
        publicKey="test_key"
        product="connect"
        env="tartan"
        clientName="Bolster"
        onSuccess={handleOnSuccess}
      />
  );
};

export default connect(state => ({
  id: state.user.id,
}))(AddBank);
