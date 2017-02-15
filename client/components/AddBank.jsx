import React from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { linkAccount } from '../actions/accountActions';

const AddBank = ({ userId, dispatch }) => {
  const handleOnSuccess = (token, metadata) => {
    dispatch(linkAccount({ userId, token, institutionName: metadata.institution.name }));
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
    </div>
  );
};

export default connect(state => ({
  userId: state.user.userId,
}))(AddBank);
