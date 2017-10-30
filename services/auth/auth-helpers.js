const bcrypt = require('bcryptjs');

function comparePass(userPass, dbPass) {
  return bcrypt.compareSync(userPass, dbPass);
}

module.exports = {
  comparePass,
};
