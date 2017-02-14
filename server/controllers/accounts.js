const Account = require('../../database/models/account');

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
