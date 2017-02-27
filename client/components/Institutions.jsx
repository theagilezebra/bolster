import React from 'react';
import { renderAccountGroups, groupAccounts } from '../helpers/accountHelpers.jsx';
import AddBank from './AddBank.jsx';

const Institutions = ({ accounts }) => (
  <div>
    <h2>Accounts</h2>
    {renderAccountGroups(groupAccounts(accounts))}
    <h3>Add a bank</h3>
    <AddBank />
  </div>

);

export default Institutions;
