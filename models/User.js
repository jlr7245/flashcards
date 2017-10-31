const db = require('../db/config');

class User {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.password_digest = user.password_digest;
    this.email = user.email;
  }

  static findByUserName(username) {
    return db.one(
        `
      SELECT * FROM users
      WHERE username = $1
      ORDER BY id ASC;
    `,
        [username]
      )
      .then(user => new User(user));
  }

  save() {
    return db.one(
      `
      INSERT INTO users
      (username, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [this.username, this.email, this.password_digest]
    ).then(user => this.modify(user));
  }

  modify(changes) {
    Object.assign(this, changes);
    return this;
  }

  flashcards() {
    return db.manyOrNone(
      ` 
      SELECT * FROM flashcards
      WHERE user_id = $1
    `,
      [this.id]
    );
  }
}

module.exports = User;
