const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'lydian_intro',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,

});

pool.on('connect', () => {
    console.log('postgres connected');

});

pool.on('error', (error) => {
    console.log('postgres error', error);
});

module.exports = pool.js 