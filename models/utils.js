module.exports = {
  modify: function(changes) {
    return Object.assign(this, changes);
  },
  validate: (property, propType) => {
    if (property) return property;
    else throw new Error(`Missing property ${propType}`);
  },
}