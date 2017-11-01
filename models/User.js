const db = require('../db/config');

class User {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.password_digest = user.password_digest;
    this.email = user.email;
  }

  static findByUserName(username) {
    return db.one(`
      SELECT * FROM users
      WHERE username = $1
      ORDER BY id ASC;
    `, username)
      .then(user => new User(user));
  }

  save() {
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

  modify(changes) {
    return Object.assign(this, changes);
  }

  flashcards() {
    return db.many(`
      SELECT *
      FROM flashcards
      WHERE user_id = $/id/
    `, this);
  }
}

module.exports = User;
