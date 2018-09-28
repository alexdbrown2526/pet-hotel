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
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error with SQL inserting into pets', error);
        res.sendStatus(500);
    });
});

router.delete('/', (req,res) => {
    console.log(req.query);
    pool.query(`DELETE FROM "owners" WHERE "id" = $1;`, [req.query.id])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting owner', error);
        
    })
})

module.exports = router;