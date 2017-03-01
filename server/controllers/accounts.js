const Account = require('../../database/models/account');
const helpers = require('../helpers');


module.exports = {
  create: (req, res) => {
    if (req.body.user_id) {
      Account.forge(req.body).save().then((account) => {
        res.status(201).end('Account created successfully.');
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    } else {
      res.status(400).end('Bad request: did you include a user_id?');
    }
  },

  get: (req, res) => Account.forge().where(req.query).fetchAll()
    .then(accounts => accounts.map(account => helpers.formatAccount(account)))
    .then((accounts) => {
      res.json(accounts);
    }).catch((err) => {
      res.status(404).json(err);
    }),

  getOne: (req, res) => {
    Account.forge().where(req.params).fetchAll().then((items) => {
      res.json(helpers.formatAccount(items));
    }).catch((err) => {
      res.status(404).json(err);
    });
  },

  bulkCreate: (accounts, userId) => new Promise((resolve, reject) => {
    if (!userId) {
      reject('Please provide user_id');
    }
    return Promise.all(accounts.map((account) => {
      const accountAttributes = {
        user_id: userId,
        availableBalance: account.balance.available,
        currentBalance: account.balance.current,
        institutionName: account.institutionName,
        accountType: account.type,
        plaidAccountId: account._id,
        name: account.meta.name,
      };
      return helpers.findOrCreate(Account, accountAttributes);
    }))
    .then((records) => {
      resolve(records);
    })
    .catch((err) => {
      reject(err);
    });
  }),
};
