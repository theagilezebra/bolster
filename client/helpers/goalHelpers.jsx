import React from 'react';
import moment from 'moment';
const displayGoals = (goals) => {
  const elements = [];
  goals.forEach((goal) => {
    elements.push(
      <li>
        <ul>
          <li>{goal.name}</li>
          <li>{goal.amount}</li>
          <li>{moment(goal.date).format('MMMM Do YYYY')}</li>
        </ul>
      </li>,
    );
  });
  return elements;
};

module.exports = {
  displayGoals,
};
