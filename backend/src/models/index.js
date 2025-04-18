const sequelize = require('../config/database');
const Note = require('./note');

const models = {
    Note,
};

// Set up associations if any
// Example: models.User.hasMany(models.Note);

module.exports = {
    sequelize,
    ...models,
};
