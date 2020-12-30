const Sequelize = require('sequelize');
const User = require('./user');
const Todo = require('./todo');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Todo = Todo;

User.init(sequelize);
Todo.init(sequelize);

module.exports = db;