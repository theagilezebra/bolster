const db = require('../database');
const User = require('./user');
const Transaction = require('./transaction');
const Achievement = require('./achievement');
const AchievementType = require('./achievementType');

module.exports = db.Model.extend({
  tableName: 'accounts',
  hasTimestamps: true,
  transactions: () => this.hasMany(Transaction),
  user: () => this.belongsTo(User),
  initialize() {
    this.on('created', (account) => {
      AchievementType.forge({ name: 'Making bank' }).fetch()
      .then(achievementType => Achievement.forge().where({
        achievementtypes_id: achievementType.id,
        user_id: account.attributes.user_id,
      }).fetch())
      .then((achievement) => {
        if (!achievement.attributes.status) {
          achievement.attributes.status = true;
          achievement.save();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },
});
