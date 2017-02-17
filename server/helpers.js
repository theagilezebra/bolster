const jwt = require('jsonwebtoken');

module.exports = {
  checkUser: (req, res, next) => new Promise((resolve, reject) => {
    jwt.verify(req.body.authorization, process.env.JWT_SECRET || 'super secret', (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
      // or should this be next(decoded)
    });
  }),
  createJWT: (req, res, newUser) => req.session.regenerate(() => {
    delete newUser.attributes.password;
    const userToken = jwt.sign({ email: newUser.attributes.email }, process.env.JWT_SECRET || 'super secret');
    res.json(userToken).redirect('/dashboard');
  }),

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
