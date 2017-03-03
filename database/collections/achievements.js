const db = require('../database');
const Achievement = require('../models/achievement');

const Achievements = new db.Collection();
Achievements.model = Achievement;
module.exports = Achievements;
