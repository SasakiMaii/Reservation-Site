const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "news",
    password: "sasaki0826",
    port: 5433,
});

module.exports = pool;