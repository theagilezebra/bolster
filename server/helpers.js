const jwt = require('jsonwebtoken');
const unless = require('express-unless');

module.exports = {
  checkUser: (req, res, next) => {
    console.log('CHECK USER TOKEN', req.get('Authorization').slice(7));
    const headerAuth = req.get('Authorization').slice(7);
    jwt.verify(headerAuth, process.env.JWT_SECRET || 'super secret', (err, decoded) => {
      if (err) {
        res.status(401).end('YOU SHALL NOT PASS!!');
      } else {
        const id = req.query.user_id || req.params.id || req.body.user_id || req.body.id;
        const jwtMatch = id ? +id === decoded.id : id;
        const bolsterKeyMatch = req.get('BolsterKey') === process.env.BOLSTER_API_KEY;
        const isAuth = decoded && req.url === '/users/auth';
        const exceptions = jwtMatch || bolsterKeyMatch || isAuth;
        exceptions ? next() : res.status(401).end('YOU SHALL NOT PASS!!');
      }
    });
  },
  createJWT: (newUser) => {
    const userToken = jwt.sign(newUser, process.env.JWT_SECRET || 'super secret');
    return userToken;
  },

  jwtRedirect: (req, res, userInstance) => {
    const userToken = module.exports.createJWT(userInstance);
    res.json({ userToken, userInstance });
  },

  findOrCreate: (model, criteria) => new Promise((resolve, reject) => {
    model.forge(criteria).fetch().then((category) => {
      resolve(category || model.forge(criteria).save(null, { method: 'insert' }));
    });
  }),

  formatUser: (userInstance, address) => {
    delete userInstance.attributes.password;
    delete userInstance.attributes.publicToken;
    delete userInstance.attributes.accessToken;
    delete userInstance.attributes.created_at;
    delete userInstance.attributes.updated_at;
    if (address) {
      userInstance.attributes.address = address.attributes.address;
      userInstance.attributes.city = address.attributes.city;
      userInstance.attributes.zip = address.attributes.zip;
      userInstance.attributes.state = address.attributes.state;
      userInstance.attributes.country = address.attributes.country;
    }
    return userInstance.attributes;
  },

  formatAccount: (accountInstance) => {
    delete accountInstance.attributes.created_at;
    delete accountInstance.attributes.updated_at;
    delete accountInstance.attributes.plaidAccountId;
    delete accountInstance.attributes.user_id;
    return accountInstance.attributes;
  },

  formatAchievement: (achievementInstance, achievementTypeInstance) => {
    delete achievementInstance.attributes.achievementtypes_id;
    delete achievementInstance.attributes.user_id;
    delete achievementInstance.attributes.updated_at;
    delete achievementInstance.attributes.created_at;
    delete achievementInstance.attributes.id;
    achievementInstance.attributes.name = achievementTypeInstance.attributes.name;
    achievementInstance.attributes.structure = achievementTypeInstance.attributes.structure;
    achievementInstance.attributes.description = achievementTypeInstance.attributes.description;
    return achievementInstance.attributes;
  },
};
