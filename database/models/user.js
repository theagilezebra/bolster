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
  address() {
    return this.belongsTo(Address);
  },
  accounts() {
    return this.hasMany(Account);
  },
  achievements() {
    return this.hasMany(Achievement);
  },
  transactions() {
    return this.hasMany(Transaction);
  },
  goals() {
    return this.hasMany(Goal);
  },
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
      if (user.attributes.accessToken) {
        AchievementType.forge({ name: 'Making bank' }).fetch()
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

    // this.on('deleting', user => new Promise((resolve, reject) => {
    //   console.log('LOL!!!');
    //   setTimeout(() => {
    //     console.log('lol!!!');
    //     resolve('lol');
    //   }, 4000);
    // }));
  },
});
