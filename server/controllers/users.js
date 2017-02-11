const bcrypt = require('bcrypt-nodejs');

const User = require('../../database/models/user');
const Address = require('../../database/models/address');

module.exports = {
  createUser: (req, res) => {
    const { firstName, lastName, email, password, address, city, state, ZIP, country } = req.body;
    const user = { firstName, lastName, email, password };
    const physicalAddress = { address, city, state, ZIP, country };
    return new Address(physicalAddress).save().then((addressInstance) => {
      user.address_id = addressInstance.id;
      bcrypt.hash((password), null, null, (err, hash) => {
        user.password = hash;
        new User(user).save()
        .then((userInstance) => {
          res.status(201).json(userInstance);
        }).catch((error) => {
          res.status(500).json(error);
        });
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    // if username does not exist
      // send 
  },
};
