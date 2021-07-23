const sequelize = require('sequelize');
const dbConfig = require('../db.config');

const seq = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = sequelize;
db.sequelize = seq;

db.shoes = require('./shoes.model.js')(seq, sequelize);
db.users = require('./users.model.js')(seq, sequelize);

db.shoes.belongsToMany(db.users, { through: 'users_shoes', foreignKey: 'shoes_id' });
db.users.belongsToMany(db.shoes, { through: 'users_shoes', foreignKey: 'users_id'});

module.exports = db;