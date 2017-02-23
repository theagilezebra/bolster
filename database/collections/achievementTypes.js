const db = require('../database');
const AchievementType = require('../models/achievementType');

const AchievementTypes = new db.Collection();
AchievementTypes.model = AchievementType;
module.exports = AchievementTypes;
