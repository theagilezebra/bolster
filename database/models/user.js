const db = require('../database');
const Account = require('./account');
const Address = require('./address');
const Transaction = require('./transaction');
const Goal = require('./goal');
const Achievement = require('./achievement');
const AchievementType = require('./achievementType');

module.exports = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  accounts: () => this.hasMany(Account),
  address: () => this.belongsTo(Address),
  transactions: () => this.hasMany(Transaction),
  goals: () => this.hasMany(Goal),
  achievements: () => this.hasMany(Achievement),
  initialize() {
    this.on('created', (user) => {
      AchievementType.forge().fetchAll()
      .then(achievementTypes => Promise.all(achievementTypes.models.map(achievementType => Achievement.forge({
        user_id: user.id,
        achievementtypes_id: achievementType.id,
      }).save())));
    });

    this.on('updated', (user) => {
      if (user.attributes.phone) {
        AchievementType.forge({ name: 'You used to call me...' }).fetch()
        .then(achievementType => Achievement.forge().where({
          achievementtypes_id: achievementType.id,
          user_id: user.id,
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
      }
    });
  },
});
