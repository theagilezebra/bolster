const Achievement = require('../../database/models/achievement');
const AchievementType = require('../../database/models/achievementType');
const User = require('../../database/models/user');
const helpers = require('../helpers');

module.exports = {
  get: (req, res) => {
    Achievement.forge().where(req.query).fetchAll()
    .then(achievements => Promise.all(achievements.map(achievement => AchievementType.forge({
      id: achievement.attributes.achievementtypes_id,
    }).fetch().then(achievementType => helpers.formatAchievement(achievement, achievementType)))))
    .then((achievements) => {
      res.json(achievements);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },
};
