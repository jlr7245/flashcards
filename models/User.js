const db = require('../db/config');

function User(user) {
  this.id = user.id || null;
  this.username = this.validate(user.username, 'username');
  this.password_digest = this.validate(user.password_digest, 'password_digest');
  this.email = this.validate(user.email, 'email');
}

const userStatics = require('./model-defaults')('users');
userStatics.findByUserName = (username) => {
  return db.one(`
    SELECT * FROM users
    WHERE username = $1
    ORDER BY id ASC
  `, username)
}
Object.setPrototypeOf(User, userStatics);

User.prototype = Object.assign(User.prototype, require('./utils'));

User.prototype.save = function() {
  return db.one(`
    INSERT INTO users (
      username, email, password_digest
    ) VALUES (
      $/username/, $/email/, $/password_digest/
    )
    RETURNING *
  `, this)
  .then(user => this.modify(user));
}

User.prototype.flashcards = function() {
  return db.manyOrNone(`
    SELECT *
    FROM flashcards
    WHERE user_id = $/id/
  `, this);
}


module.exports = User;
