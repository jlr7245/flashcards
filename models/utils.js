module.exports = {
  modify: function(changes) {
    return Object.assign(this, changes);
  },
  validate: (property, propType, isOptional = false) => {
    if (property || isOptional) return property;
    else throw new Error(`Missing property ${propType}`);
  },
};
