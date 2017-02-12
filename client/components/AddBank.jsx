import React from 'react';
import PlaidLink from 'react-plaid-link';
import { linkAccount } from '../actions/accountActions';

export default function AddBank({ dispatch }) {
  const handleOnSuccess = (token) => {
    dispatch(linkAccount({ token }));
  };

  return (
    <div>
      <PlaidLink
        publicKey="test_key"
        product="auth"
        env="tartan"
        clientName="Bolster"
        onSuccess={handleOnSuccess}
      />
    </div>
  );
}
