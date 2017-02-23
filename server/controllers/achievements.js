const Achievement = require('../../database/models/achievement');
const AchievementType = require('../../database/models/achievementType');
const User = require('../../database/models/user');

module.exports = {
  fetch: (options) => {
    Achievement.forge().where(options).fetchAll().then((achievements) => {
      console.log(achievements);
    });
  },

  test: (req, res, options) => {
    // AchievementType.forge({ name: 'cool achievement', description: 'best achievement in the world' }).save()
    // .then((achievementType) => {
    //   res.json('cool this is the end');
    // })
    // .catch((err) => {
    //   res.json(err);
    // });

    AchievementType.forge().where({ name: 'cool achievement' }).fetchAll()
    .then(achivementTypes => Promise.all(achivementTypes.map(achievementType => achievementType.delete()))
      .then((destroyeditems) => {
        res.json(destroyeditems.length);
      }))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  },
};
