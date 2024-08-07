require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: process.env.CONNECTIONLIMIT
}

const pool = mysql.createPool(dbConfig);

module.exports = pool;