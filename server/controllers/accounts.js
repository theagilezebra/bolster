const Account = require('../../database/models/account');

module.exports = {
  create: (req, res) => {
    if (req.body.hasOwnProperty('user_id')) {
      new Account(req.body).save().then((account) => {
        res.status(201).end('Account created successfully.');
      })
      .catch((err) => {
        res.status(404).json(err);
      });
    }
  },
};
