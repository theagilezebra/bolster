import React from 'react';
import PlaidLink from 'react-plaid-link';
import { linkAccount } from '../actions/accountActions';

export default function AddBank({ dispatch }) {
  const handleOnSuccess = (token, metadata) => {
    dispatch(linkAccount({ token, institutionName: metadata.institution.name }));
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
}
