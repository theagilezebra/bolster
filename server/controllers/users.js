const User = require('../../database/models/user');
const Address = require('../../database/models/address');

module.exports = {
  createUser: (req, res) => {
    const { firstName, lastName, email, password, address, city, state, ZIP, country } = req.body;
    const user = { firstName, lastName, email, password };
    const physicalAddress = { address, city, state, ZIP, country };
    const newAddress = new Address(physicalAddress).save().then((addressInstance) => {
      user.address_id = addressInstance.id;
      const newUser = new User(user);
      return newUser.save();
    }).then((userInstance) => {
      res.status(201).json(userInstance);
    }).catch((err) => {
      res.status(500).json(err);
    });
  },
};
