import React from 'react';
import { renderAccountGroups, groupAccounts } from '../helpers/accountHelpers.jsx';

const Institutions = ({ accounts }) => (
  <div>
    <h2>Accounts</h2>
    {renderAccountGroups(groupAccounts(accounts))}
  </div>
);

export default Institutions;
