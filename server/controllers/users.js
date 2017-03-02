const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../../database/models/user');
const Address = require('../../database/models/address');
const helpers = require('../helpers');

module.exports = {
  signup: (req, res) => {
    const { firstName, lastName, email, password, address = 'undefined', city = '', state = '', zip = '', country = '', phone = '' } = req.body;
    const user = { firstName, lastName, email, password, phone };
    const physicalAddress = { address, city, state, zip, country };
    return helpers.findOrCreate(Address, physicalAddress).then((addressInstance) => {
      user.address_id = addressInstance.id;
      bcrypt.hash((password), null, null, (err, hash) => {
        user.password = hash;
        new User(user).save()
        .then((userInstance) => {
          userInstance = helpers.formatUser(userInstance, addressInstance);
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
          Address.forge({ id: userInstance.attributes.address_id }).fetch()
          .then((address) => {
            helpers.jwtRedirect(req, res, helpers.formatUser(userInstance, address));
          })
          .catch(() => {
            helpers.jwtRedirect(req, res, helpers.formatUser(userInstance));
          });
        } else {
          res.status(401).end('wrong username or password');
        }
      });
    }).catch((err) => {
      res.status(401).end('wrong username or password');
    });
  },

  update: (req, res) => {
    let user;
    new User(req.params).save(req.body, { patch: false })
    .then(userInstance => User.forge({ id: userInstance.id }).fetch())
    .then((userInstance) => {
      user = userInstance;
      return Address.forge({ id: user.attributes.address_id }).fetch();
    }).then((address) => {
      res.status(204).json(helpers.formatUser(user, address));
    }).catch((err) => {
      res.status(400).json(err);
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

  delete: (req, res) => {
    const { email, password } = req.body;
    new User({ email }).fetch({ withRelated: ['accounts', 'achievements', 'transactions', 'goals'] }).then((userInstance) => {
      bcrypt.compare(password, userInstance.attributes.password, (err, match) => {
        if (match) {
          Promise.all(userInstance.relations.transactions.models.map(model => model.destroy()))
          .then(() => Promise.all(userInstance.relations.accounts.models.map(model => model.destroy())))
          .then(() => Promise.all(userInstance.relations.goals.models.map(model => model.destroy())))
          .then(() => Promise.all(userInstance.relations.achievements.models.map(model => model.destroy())))
          .then(() => userInstance.destroy())
          .then(() => res.status(202).end('User deleted'));
          userInstance.destroy().then(() => {
            res.status(202).end('User deleted');
          });
        } else {
          res.status(401).end('wrong password');
        }
      });
    }).catch((err) => {
      console.log(err);
      res.status(401).end('wrong email or password');
    });
  },
};
