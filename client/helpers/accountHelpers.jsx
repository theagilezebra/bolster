import React from 'react';

const convertBalances = accounts => accounts.map((account) => {
  account.availableBalance = +account.availableBalance;
  account.currentBalance = +account.currentBalance;
  return account;
});

const renderAccounts = accounts => accounts.map((account, key) => (
  <tr key={key}>
    <td>{account.name}</td>
    <td>{account.availableBalance}</td>
    <td>{account.currentBalance}</td>
    <td>{account.accountType[0].toUpperCase() + account.accountType.slice(1)}</td>
    <td>{account.institutionName}</td>
  </tr>
));

module.exports = {
  convertBalances,
  renderAccounts,
};
