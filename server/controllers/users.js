const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../../database/models/user');
const Address = require('../../database/models/address');
const helpers = require('../helpers');

module.exports = {
  signup: (req, res) => {
    const { firstName, lastName, email, password, address = 'undefined', city = '', state = '', zip = 0, country = '' } = req.body;
    const user = { firstName, lastName, email, password };
    const physicalAddress = { address, city, state, zip, country };
    return helpers.findOrCreate(Address, physicalAddress).then((addressInstance) => {
      user.address_id = addressInstance.id;
      bcrypt.hash((password), null, null, (err, hash) => {
        user.password = hash;
        new User(user).save()
        .then((userInstance) => {
          userInstance = helpers.formatUser(userInstance);
          helpers.jwtRedirect(req, res, userInstance);
        }).catch((error) => {
          res.status(400).json(error);
        });
      });
    });
  },

  signin: (req, res) => {
    const { email, password } = req.body;
    new User({ email }).fetch().then((userInstance) => {
      bcrypt.compare(password, userInstance.attributes.password, (err, match) => {
        if (match) {
          // TODO: decorate user instance with address information (see checkAuth bellow)
          helpers.jwtRedirect(req, res, helpers.formatUser(userInstance));
        } else {
          res.status(401).end('wrong username or password');
        }
      });
    }).catch((err) => {
      res.status(401).end('wrong username or password');
    });
  },

  update: (req, res) => {
    new User(req.params).fetch({ require: true }).then((userInstance) => {
      userInstance.save(req.body, { patch: true }).then((user) => {
        res.json(helpers.formatUser(userInstance)).status(204);
      }).catch((err) => {
        res.json(err).status(404);
      });
    })
    .catch((err) => {
      res.json(err).status(404);
    });
  },

  checkAuth: (req, res) => {
    const headerAuth = req.get('Authorization').slice(7);
    jwt.verify(headerAuth, process.env.JWT_SECRET || 'super secret', (err, decoded) => {
      if (err) {
        res.status(401).end('YOU SHALL NOT PASS!!');
      } else {
        let user;
        User.forge({ id: decoded.id }).fetch().then((userInstance) => {
          user = userInstance;
          return Address.forge({ id: user.attributes.address_id }).fetch();
        }).then((address) => {
          res.json(helpers.formatUser(user, address));
        })
        .catch((error) => {
          res.status(500).json(error);
        });
      }
    });
  },
};
