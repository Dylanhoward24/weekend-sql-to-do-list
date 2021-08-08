const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

//// CODE WILL GO HERE
//
//--- GET ENDPOINT ---
// corresponds with get request on client-side
// whenever function refreshTasks() is called
router.get('/', (req, res) => {
    // mimic postico code to get data from database
    let queryText = `
        SELECT * FROM "tasks" 
        ORDER BY "due" ASC
    `;

    // use SQL through pool.query to get the info back to client
    pool.query(queryText).then(result => {

        // result --> information from database
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
}); // end router.get
//
//--- POST ENDPOINT ---
// corresponds with the post request on client-side
// whenever function addTask() is called
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding new task', newTask);

    // use SQL to add the new task to database
    let queryText = `
        INSERT INTO "tasks" ("task", "due")
        VALUES ($1, $2)
    `;
    // this substitutes in for the $1/$2
    let sqlParams= [
        req.body.task,  // $1
        req.body.due,   // $2
    ];

    pool.query(queryText, sqlParams)
        .then(result => {
            res.sendStatus(201); // created
        }).catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
}); // end router.post
//
//--- DELETE ENDPOINT ---
// corresponds with the delete request on client-side
// whenever function deleteTask() is called
router.delete('/:id', (req, res) => {
    console.log('req.params.id is', req.params.id);
    
    // use SQL to delete a task from the database
    let queryText = `
        DELETE FROM "tasks" 
        WHERE "id" = $1
    `;
    // this substitutes in for the $1
    const sqlParams = [
        req.params.id   // $1
    ];

    pool.query(queryText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200); // OK
        }).catch((err) => {
            console.log('DELETE error', err);
        });
}); // end router.delete

module.exports = router;