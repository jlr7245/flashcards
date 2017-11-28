const User = require('../models/User');
const bcrypt = require('bcryptjs');

const usersController = {};

usersController.index = (req, res, next) => {
  new User(req.user)
    .flashcards()
    .then((flashcards) => {
      res.render('user/user-index', {
        auth: !!req.user,
        user: req.user,
        flashcards,
      });
    }).catch(next);
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
    .then((user) => {
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/user');
      });
    })
    .catch(next);
};

module.exports = usersController;
