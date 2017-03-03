import React from 'react';
import { deleteAccount } from '../actions/accountActions';

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

const deleteInsitutionHandler = (dispatch, bankAccounts) => {
  dispatch(deleteAccount({ accountName: bankAccounts[Object.keys(bankAccounts)[0]][0].institutionName }));
};

const renderAccountGroups = (bankAccounts, dispatch) => {
  const institutionWithAccounts = [];
  for (const key in bankAccounts) {
    institutionWithAccounts.push((
      <div key="key">
        <div>
          <h3 style={{ display: 'inline-block' }}>{key}</h3>
          <button
            style={{ float: 'right', 'margin-top': '20px', 'margin-bottom': '10px' }}
            onClick={() => { deleteInsitutionHandler(dispatch, bankAccounts); }}
          >Delete</button>
        </div>
        <ul className="banklist">
          {bankAccounts[key].map(item => (
            <li key={item.id}><span className="bankbalances">{item.name} </span>: {item.currentBalance}</li>
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
