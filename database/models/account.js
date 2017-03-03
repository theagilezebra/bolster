const db = require('../database');
const User = require('./user');
const Transaction = require('./transaction');
const Achievement = require('./achievement');
const AchievementType = require('./achievementType');

module.exports = db.Model.extend({
  tableName: 'accounts',
  hasTimestamps: true,
  transactions() {
    return this.hasMany(Transaction);
  },
  user() {
    return this.belongsTo(User);
  },
});
