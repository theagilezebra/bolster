const db = require('../database');

const Accounts = require('./accounts');
const Addresses = require('./addresses');
const Budgets = require('./budgets');
const Users = require('./users');
const Businesses = require('./businesses');
const Categories = require('./categories');
const Goals = require('./goals');
const Transactions = require('./transactions');

module.exports = {
  Accounts,
  Addresses,
  Budgets,
  Businesses,
  Categories,
  Goals,
  Transactions,
  Users,
};
