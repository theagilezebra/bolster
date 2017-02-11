const db = require('../database');
const Goal = require('../models/goal');

const Goals = new db.Collection();
Goals.model = Goal;
module.exports = Goals;
