const express = require('express');
const pool = require('../modules/pool');

let router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "owners";`)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with sql getting owners from db', error);
            res.sendStatus(500);
        });
        
});

router.post('/', (req,res) => {
    pool.query(`INSERT INTO "owners"("owner_name", "number_of_pets")
    VALUES ($1,$2);`, [req.body.owner_name, req.body.number_of_pets])
});

module.exports = router;