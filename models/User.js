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
    `,
        [username]
      )
      .then(user => {
        return new User(user);
      });
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
    );
  }
}
