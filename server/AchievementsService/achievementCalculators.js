const { trappistMonk, hero, periodicAchievementGenerator } = require('./gameHelpers');

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

  'Stay hungry': function (purchases, creationDate) {
    return periodicAchievementGenerator({ purchases, percentage: 0.2, category: '13000000', creationDate });
  },
  'Peanut butter jelly time!': function (purchases, creationDate) {
    return periodicAchievementGenerator({ purchases, category: '13005000', creationDate });
  },
  'Stone-cold sober': function (purchases, creationDate) {
    return periodicAchievementGenerator({ purchases, percentage: 0.5, category: '13001000', creationDate });
  },
  'Do you even thrift?': function (purchases, creationDate) {
    return periodicAchievementGenerator({ purchases, percentage: 0.5, category: '19012001', creationDate });
  },
};
