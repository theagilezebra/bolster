import React from 'react';
import moment from 'moment';

const displayGoals = (goals, callback, handler) => goals.map((goal, key) => (
  <tr key={key}>
    <td onClick={callback}>{goal.name}</td>
    <td onClick={callback}>{goal.amount}</td>
    <td onClick={callback}>{moment(goal.startDate).format('MMMM Do YYYY')}</td>
    <td onClick={callback}>{moment(goal.endDate).format('MMMM Do YYYY')}</td>
    <td><button data-goal={goal.id} onClick={handler}>Delete Goal</button></td>
  </tr>
));

const parseDate = (date) => {
  date = date.split(' ');
  const months = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  const day = date[1].replace(/[dhnrst]/g, '');
  return `${date[2]}-${months[date[0]]}-${day.length !== 1 ? day : 0 + day}`;
};

module.exports = {
  displayGoals,
  parseDate,
};
