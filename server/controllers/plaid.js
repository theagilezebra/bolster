const axios = require('axios');

const Category = require('../../database/models/category');
const User = require('../../database/models/user');
const transactionsController = require('./transactions');
const accountsController = require('./accounts');
const helpers = require('../helpers');

require('dotenv').config({ path: `${__dirname}/../../.env` });

const { PLAID_CLIENT_ID, PLAID_SECRET } = process.env;

module.exports = {
  connect: {
    link: (req, res) => {
      let access_token;
      const { id, public_token, institutionName } = req.body;
      axios.post('https://tartan.plaid.com/exchange_token', {
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        public_token,
      })
      .then(({ data }) => {
        access_token = data.access_token;
        helpers.findOrCreate(User, { id }).then(({ attributes }) => {
          attributes.accessToken = access_token;
          attributes.publicToken = public_token;
          new User(attributes).save();
        });
      })
      .then(() => axios.post('https://tartan.plaid.com/connect/get', {
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        access_token,
      })
      .then(({ data }) => {
        const { accounts } = data;
        accounts.forEach((account) => { account.institutionName = institutionName; });
        accountsController.bulkCreate(accounts, id).then(() => res.json('Accounts linked successfully.'));
      }))
      .catch((err) => {
        console.log(err);
      });
    },

    get: (req, res) => {
      const { id } = req.body;
      helpers.findOrCreate(User, { id }).then(({ attributes }) => axios.post('https://tartan.plaid.com/connect/get', {
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        access_token: attributes.accessToken,
      }))
      .then(({ data }) => {
        const { transactions } = data;
        return transactionsController.bulkCreate(transactions, id).then(() => res.json('Transactions stored successfully.'));
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },

  categories: {
    get: () => axios.get('https://tartan.plaid.com/categories').then((data) => {
      const categories = {};
      for (let i = 0; i < data.data.length; i += 1) {
        categories[data.data[i].id] = JSON.stringify(data.data[i].hierarchy);
      }
      return Promise.all(Object.keys(categories).map(id => helpers.findOrCreate(Category, { id, categories: categories[id] })))
      .then(() => {
        Category.forge({ id: '30000000', categories: '["Uncategorized"]' }).save(null, { method: 'insert' });
      });
    })
    .catch((err) => {
      console.log(err);
    }),
  },
};

// module.exports.connect.get({ access_token: 'test_wells', client_id: PLAID_CLIENT_ID, secret: PLAID_SECRET }, 1);
// module.exports.categories.get();
