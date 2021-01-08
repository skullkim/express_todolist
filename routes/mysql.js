const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SEQUELIZE_SECRETE,
    database: 'study_group_login',
});

module.exports = connection;