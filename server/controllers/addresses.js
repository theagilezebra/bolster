const User = require('../../database/models/user');
const Address = require('../../database/models/address');
const helpers = require('../helpers');

module.exports = {
  post: (req, res) => {
    let address;
    const userId = req.body.user_id;
    delete req.body.user_id;
    helpers.findOrCreate(Address, req.body)
    .then((addressInstance) => {
      address = addressInstance;
      return User.forge({ id: userId }).save({ address_id: address.id });
    })
    .then((user) => {
      res.status(201).json(helpers.formatUser(user, address));
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },
};
