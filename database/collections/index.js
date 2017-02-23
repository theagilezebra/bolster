const db = require('../database');

const Accounts = require('./accounts');
const Addresses = require('./addresses');
const Achievements = require('./achievements');
const AchievementTypes = require('./achievementTypes');
const Budgets = require('./budgets');
const Businesses = require('./businesses');
const Categories = require('./categories');
const Goals = require('./goals');
const Transactions = require('./transactions');
const Users = require('./users');

module.exports = {
  Accounts,
  Achievements,
  AchievementTypes,
  Addresses,
  Budgets,
  Businesses,
  Categories,
  Goals,
  Transactions,
  Users,
};
