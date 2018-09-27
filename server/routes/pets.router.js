const express = require('express');
const pool = require('../modules/pool');

let router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "pets";`)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with SQL select for pets', error);
            res.sendStatus(500);
        });
        
});

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "pets" ("owner", "pet_name", "breed", "color")
                VALUES ($1, $2, $3, $4);`,
                 [req.body.owner,req.body.pet_name, req.body.breed, req.body.color])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with SQL inserting into pets', error);
            res.sendStatus(500);
        });



});

module.exports = router;