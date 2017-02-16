const axios = require('axios');

const Category = require('../../database/models/category');
const transactionsController = require('./transactions');
const accountsController = require('./accounts');
const helpers = require('../helpers');

module.exports = {
  connect: {
    get: (body, userId) => axios.post('https://tartan.plaid.com/connect/get', body).then((data) => {
      const { transactions, accounts } = data.data;
      return accountsController.bulkCreate(accounts, userId)
      .then(() => transactionsController.bulkCreate(transactions, userId))
      .catch((err) => {
        console.log(err);
      });
    }),
  },

  categories: {
    get: () => axios.get('https://tartan.plaid.com/categories')
    .then((data) => {
      const categories = {};
      for (let i = 0; i < data.data.length; i += 1) {
        for (let n = 0; n < data.data[i].hierarchy.length; n += 1) {
          categories[data.data[i].hierarchy[n]] = null;
        }
      }
      return Promise.all(Object.keys(categories).map(category => helpers.findOrCreate(Category, { name: category })))
      .then(() => {
        Category.forge({ name: 'Account Transfer' }).save();
      });
    })
    .catch((err) => {
      console.log(err);
    }),
  },
};

module.exports.connect.get({ access_token: 'test_wells', client_id: process.env.PLAID_CLIENT_ID, secret: process.env.PLAID_SECRET }, 1);
// module.exports.categories.get();
