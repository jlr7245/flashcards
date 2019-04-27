const db = require('../db/config');

function Keyword(word) {
  this.id = word.id || null;
  this.keyword = this.validate(word.keyword, 'keyword');
}

const keywordStatics = require('./model-defaults')('keywords');
Object.setPrototypeOf(Keyword, keywordStatics);

Keyword.prototype = Object.assign(Keyword.prototype, require('./utils'));

Keyword.prototype.save = function() {
  return db.one(
    `INSERT INTO keywords (keyword) VALUES ($/keyword/) RETURNING *`,
    this
  ).then(keyword => this.modify(keyword));
}

module.exports = Keyword;