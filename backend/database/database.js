import {} from 'dotenv/config'
import PoolApi from 'pg';
const Pool = PoolApi.Pool

const pool = new Pool({
    user: process.env.dbUser,
    password: process.env.dbPass,
    host: 'localhost',
    port: 5432,
    database: process.env.dbName
});

export default pool;