const { assert } = require('chai');
const moment = require('moment');
const { populateGoalChart } = require('../client/helpers/budgetHelpers.jsx');

describe('Budget Helpers', () => {
  describe('populateGoalChart', () => {
    const transactions = {
      transactionsData: [
        { date: '2017-03-05', amount: 100 },
        { date: '2017-03-06', amount: 20 },
        { date: '2017-03-06', amount: 8 },
        { date: '2017-03-07', amount: 14 },
      ],
      dailyAverage: 20,
    };
    const goal = { amount: 10, startDate: '2017-03-06', endDate: '2017-03-10' };
    const goalData = populateGoalChart(transactions, goal);

    it('should output an array of human readable dates between goal start and end dates', () => {
      const dates = '["March 6th 2017","March 7th 2017","March 8th 2017","March 9th 2017"]';
      assert.equal(JSON.stringify(goalData.labels), dates);
    });

    it('should create a label for each line dataset', () => {
      const labels = '["Average Spending","Spending Limit","Money Blown"]';
      assert.equal(JSON.stringify(goalData.datasets.map(data => data.label)), labels);
    });

    it('should calculate average spending for the timespan of a goal', () => {
      goalData.datasets[0].data.forEach((average) => {
        assert.equal(average, transactions.transactionsData.length * transactions.dailyAverage);
      });
    });

    it('should determine total spenditures for the goal timespan', () => {
      const total = transactions.transactionsData.reduce((sum, { date, amount }) => {
        if (moment(date).valueOf() >= moment(goal.startDate).valueOf() && moment(date).valueOf() <= moment(goal.endDate).valueOf()) sum += amount;
        return sum;
      }, 0);
      assert.equal(goalData.datasets[2].data[goalData.datasets[2].data.length - 1], total);
    });
  });
});
