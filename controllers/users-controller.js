const User = require('../models/User');
const bcrypt = require('bcryptjs');

const usersController = {};

usersController.index = (req, res, next) => {
  res.render('user/user-index', {
    user: req.user,
  });
};

usersController.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  new User({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
  })
    .save()
    .then(user => {
      req.login(user, err => {
        if (err) return next(err);
        res.redirect('/user');
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = usersController;
