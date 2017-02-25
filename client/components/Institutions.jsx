import React from 'react';

const Institutions = ({ accounts }) => {
  const groupAccounts = bankAccounts => bankAccounts.reduce((prev, curr) => {
    if (Object.prototype.hasOwnProperty.call(prev, curr.institutionName)) {
      prev[curr.institutionName].push(curr);
    } else {
      prev[curr.institutionName] = [curr];
    }
    return prev;
  }, {});

  const renderAccounts = (bankAccounts) => {
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

  return (
    <div>
      <h2>Accounts</h2>
      {renderAccounts(groupAccounts(accounts))}
    </div>
  );
};

export default Institutions;
