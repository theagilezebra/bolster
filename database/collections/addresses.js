const db = require('../database');
const Address = require('../models/address');

const Addresses = new db.Collection();
Addresses.model = Address;
module.exports = Addresses;
