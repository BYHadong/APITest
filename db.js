const Sequelize = require('sequelize');
DATABASE_URL = 'postgres://postgres:134679@127.0.0.1:5432/postgres';

const database = new Sequelize(DATABASE_URL);

module.exports = database;