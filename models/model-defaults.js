const db = require('../db/config');

module.exports = (tablename) => ({
  findAll: () => db.query(`SELECT * FROM ${tablename}`),
  findById: (id) => db.one(`SELECT * FROM ${tablename} WHERE id = $1`, id),
  destroy: (id) => db.none(`DELETE FROM ${tablename} WHERE id = $1`, id),
});