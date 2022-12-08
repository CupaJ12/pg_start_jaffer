const express = require('express');
const router = express.Router();
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

router.get('/', (req, res) => {
    let queryText = 'select * from songs;';
    pool.query(queryText)
    .then((result) => {
        console.log('results from db', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    })
})
router.post('/', (req, res) => {
    const newsong = req.body;
    const queryText = `
    INSERT INTO "SONGS" ("rank", "artist", "track", "published")
    VALUES(${newsong.rank}, ${newsong.artist}, ${newsong.track}, ${newsong.published})
    `;
    pool.query(queryText)
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making insert query', error);
        res.sendStatus(500);
    })
})

module.exports = router;