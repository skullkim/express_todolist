require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.SEQUELIZE_SECRETE,
    "database": "study_group_login",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.SEQUELIZE_SECRETE,
    "database": "study_group_login",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.SEQUELIZE_SECRETE,
    "database": "study_group_login",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
