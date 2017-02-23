const db = require('../database');
const AchievementTypes = require('./achievement');
const User = require('./user');

module.exports = db.Model.extend({
  tableName: 'achievements',
  hasTimestamps: true,
  achievementType: () => this.belongsTo(AchievementTypes),
  user: () => this.belongsTo(User),
});
