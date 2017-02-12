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
};
