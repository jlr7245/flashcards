const db = require('../db/config');

module.exports = (tablename) => ({
  findAll: () => db.query(`SELECT * FROM ${tablename} ORDER BY id`),
  findLimited: (start, count) => db.query(`SELECT * FROM ${tablename} ORDER BY id ASC OFFSET ${start} LIMIT ${count}`),
  findById: (id) => db.one(`SELECT * FROM ${tablename} WHERE id = $1`, id),
  destroy: (id) => db.none(`DELETE FROM ${tablename} WHERE id = $1`, id),
});