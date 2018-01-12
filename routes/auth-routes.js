const express         = require('express');
const passport        = require('../services/auth/local');
const authHelpers     = require('../services/auth/auth-helpers');
const usersController = require('../controllers/users-controller');

const authRouter = express.Router();

authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/verify',
    failureRedirect: '/auth/verify',
    failureFlash:    true,
  })
);

authRouter.get('/verify', (req, res) => {
  if (req.user) {
    res.json({
      auth: !!req.user,
      data: {
        user: req.user,
      },
    });
  } else {
    res.json({
      auth: !!req.user,
    });
  }
});

authRouter.post('/register', usersController.create);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/verify');
});

module.exports = authRouter;
