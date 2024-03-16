require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.dbUser,
    password: process.env.dbPass,
    host: 'localhost',
    port: 5432,
    database: process.env.dbName
});

module.exports = pool;