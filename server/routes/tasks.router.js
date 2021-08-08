const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// CODE WILL GO HERE

// corresponds with get request on client-side
// whenever function refreshTasks() is called
router.get('/', (req, res) => {
    // mimic postico code to get data from database
    let queryText = 'SELECT * FROM "tasks" ORDER BY "due" ASC;';

    // use SQL through pool.query to get the info back to client
    pool.query(queryText).then(result => {
        
        // result --> information from database
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

module.exports = router;