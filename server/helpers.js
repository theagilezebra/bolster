module.exports = {
  checkUser: (req, res, next) => {
    if (req.session ? !!req.session.user : false) {
      next();
    } else {
      res.redirect('/login');
    }
  },

  createSession: (req, res, newUser) => req.session.regenerate(() => {
    delete newUser.attributes.password;
    req.session.user = newUser.attributes;
    res.redirect('/');
  }),

  findOrCreate: (model, criteria) => new Promise((resolve, reject) => {
    model.forge(criteria).fetch().then((instance) => {
      if (instance) {
        resolve(instance);
      } else {
        model.forge(criteria).save().then((instance) => {
          resolve(instance);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }),
};
