const express = require('express');
const router = express.Router();

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
    VALUES($1, $2, $3, $4)
    `;
    pool.query(queryText, [newsong.rank, 
        newsong.artist, 
        newsong.track, 
        newsong.published])
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