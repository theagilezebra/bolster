const db = require('../database');
const Budget = require('../models/budget');

const Budgets = new db.Collection();
Budgets.model = Budget;
module.exports = Budgets;
