const Account = require('../../database/models/account');
const plaid = require('plaid');

require('dotenv').config({ path: `${__dirname}/../../.env` });

const plaidClient = new plaid.Client(process.env.PLAID_CLIENT_ID, process.env.PLAID_SECRET, plaid.environments.tartan);

module.exports = {
  create: (req, res) => {
    if (req.body.user_id) {
      new Account(req.body).save().then((account) => {
        res.status(201).end('Account created successfully.');
      })
      .catch((err) => {
        res.status(400).end(err);
      });
    } else {
      res.status(400).end('Bad request: did you include a user_id?');
    }

    // plaidClient.exchangeToken(req.body.token, (exchangeErr, exchangeTokenRes) => {
    //   if (exchangeErr != null) {
    //     console.log(exchangeErr);
    //   } else {
    //     // - exchangeTokenRes.access_token (the Plaid access token - store somewhere persistent)
    //     // associate the access token with a specific user and use it to request all subsequent plaid api calls
    //     plaidClient.getConnectUser(exchangeTokenRes.access_token, (connectErr, connectRes) => {
    //       if (connectErr != null) {
    //         console.log(connectErr);
    //       } else {
    //         // return account data
    //         res.json(connectRes);
    //       }
    //     });
    //   }
    // });
  },

  get: (req, res) => {
    Account.forge().where(req.query).fetchAll().then((items) => {
      res.json(items);
    }).catch((err) => {
      res.status(404).json(err);
    });
  },

  getOne: (req, res) => {
    Account.forge().where(req.params).fetchAll().then((items) => {
      res.json(items);
    }).catch((err) => {
      res.status(404).json(err);
    });
  },
};
