const jwt = require('jsonwebtoken');
const unless = require('express-unless');

module.exports = {
  checkUser: (req, res, next) => {
    const headerAuth = req.get('Authorization').slice(7);
    jwt.verify(headerAuth, process.env.JWT_SECRET || 'super secret', (err, decoded) => {
      if (err) {
        res.status(401).end('YOU SHALL NOT PASS!!');
      } else {
        next();
      }
    });
  },
  createJWT: (newUser) => {
    const userToken = jwt.sign(newUser, process.env.JWT_SECRET || 'super secret');
    return userToken;
  },

  jwtRedirect: (req, res, userInstance) => {
    const userToken = module.exports.createJWT(userInstance);
    res.json({ userToken, userInstance }).redirect('/dashboard');
  },

  findOrCreate: (model, criteria) => new Promise((resolve, reject) => {
    model.forge(criteria).fetch().then((category) => {
      resolve(category || model.forge(criteria).save(null, { method: 'insert' }));
    });
  }),
};
    // if (req.session ? !!req.session.user : false) {
    //   next();
    // } else {
    //   res.redirect('/login');
    // }
