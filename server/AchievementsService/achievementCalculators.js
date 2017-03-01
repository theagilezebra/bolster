const { trappistMonk, hero } = require('./gameHelpers');

module.exports = {

  'Trappist Monk': function (purchases) {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return trappistMonk(date, 1, purchases);
  },

  'Daily Hero': function (purchases) {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return hero(date, 1, 'daily', purchases);
  },

  'Weekly Hero': function (purchases) {
    const date = new Date();
    date.setDate(date.getDate() - 8);
    return hero(date, 7, 'weekly', purchases);
  },
};

