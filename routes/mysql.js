const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rladbsrl&1878',
    database: 'study_group_login',
});

module.exports = connection;