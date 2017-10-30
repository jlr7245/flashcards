const bcrypt = require('bcryptjs');

function comparePass(userPass, dbPass) {
  return bcrypt.compareSync(userPass, dbPass);
}

function loginRedirect(req, res, next) {
  if (req.user) return res.redirect('/user');
  return next();
}

function loginRequired(req, res, next) {
  if (!req.user) return res.redirect('/auth/login');
  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
};
