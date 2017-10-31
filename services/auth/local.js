const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const User = require('../../models/User');
const authHelpers = require('./auth-helpers');

init();

passport.use(new LocalStrategy({}, (username, password, done) => {
  User.findByUserName(username)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      if (!authHelpers.comparePass(password, user.password_digest)) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
}));

module.exports = passport;
