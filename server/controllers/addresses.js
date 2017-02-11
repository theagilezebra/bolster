const Address = require('../../database/models/address');

module.exports = {
  createAddress: (req, res) => {
    const newUser = new Address(req.body);
    newUser.save();
    console.log(req.body);
    res.end('kthxbai');
  },
};
