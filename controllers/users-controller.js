const User = require('../models/User');
const bcrypt = require('bcryptjs');

const usersController = {};

usersController.index = (req, res, next) => {
  new User(req.user)
    .flashcards()
    .then((flashcards) => {
      res.json({
        auth: !!req.user,
        data: {
          user: req.user,
          flashcards,
        },
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
        return res.redirect('/api/user');
      });
    })
    .catch(next);
};

module.exports = usersController;
