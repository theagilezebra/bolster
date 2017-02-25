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

const groupAccounts = bankAccounts => bankAccounts.reduce((prev, curr) => {
  if (Object.prototype.hasOwnProperty.call(prev, curr.institutionName)) {
    prev[curr.institutionName].push(curr);
  } else {
    prev[curr.institutionName] = [curr];
  }
  return prev;
}, {});

const renderAccountGroups = (bankAccounts) => {
  const institutionWithAccounts = [];
  for (const key in bankAccounts) {
    institutionWithAccounts.push((
      <div key="key">
        <h3>{key}</h3>
        <ul>
          {bankAccounts[key].map(item => (
            <li key={item.id}>{item.name}: {item.currentBalance}</li>
          ))}
        </ul>
      </div>
    ));
  }
  return institutionWithAccounts;
};

module.exports = {
  renderAccountGroups,
  convertBalances,
  renderAccounts,
  groupAccounts,
};
