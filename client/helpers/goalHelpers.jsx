import React from 'react';
import moment from 'moment';
const displayGoals = (goals, handler) => {
  const elements = [];
  goals.forEach((goal) => {
    elements.push(
      <tr>
        <td>{goal.name}</td>
        <td>{goal.amount}</td>
        <td>{moment(goal.date).format('MMMM Do YYYY')}</td>
        <td><button data-goal={goal.id} onClick={handler}> Delete Goal</button></td>
      </tr>,
    );
  });
  return elements;
};

module.exports = {
  displayGoals,
};
