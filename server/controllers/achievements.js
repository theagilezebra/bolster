const Achievement = require('../../database/models/achievement');
const AchievementType = require('../../database/models/achievementType');
const User = require('../../database/models/user');

module.exports = {
  get: (req, res) => {
    Achievement.forge().where(req.query).fetchAll()
    .then((achievements) => {
      res.json(achievements);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },
};
