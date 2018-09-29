const express = require('express');
const pool = require('../modules/pool');

let router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "owners" left outer JOIN "pets" ON "owners"."id" = "pets"."owner_id";`)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with SQL select for pets', error);
            res.sendStatus(500);
        });
        
});

router.post('/', (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO "pets" ("owner_id", "pet_name", "breed", "color")
                VALUES ($1, $2, $3, $4);`,
                 [req.body.owner_id, req.body.pet_name, req.body.breed, req.body.color])
        .then(() => {
            pool.query(`UPDATE "owners"
                        SET "number_of_pets" = "number_of_pets" + 1
                        WHERE "id"=$1;`, [req.body.owner_id])
        })
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with SQL inserting into pets', error);
            res.sendStatus(500);
        });
    })

router.delete('/', (req, res) => {
    pool.query( `DELETE FROM "pets" WHERE "id"=$1;`, [req.query.id])
    .then(() => {
        pool.query(`UPDATE "owners"
                    SET "number_of_pets" = "number_of_pets" - 1
                    WHERE "id"=$1;`, [req.query.owner_id])
    })
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting pets from db', error);
        res.sendStatus(500);
        
    })
});



router.put('/', (req, res) => {
    let date = new Date()
    pool.query(`
    UPDATE "pets" 
    SET "checked_in"=$2, "checked_in_date"=$3 
    WHERE "id"=$1;`, [req.body.id, req.body.checked_in, date])
    .then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('error updating checked in', error);
        res.sendStatus(500);
    });
});


module.exports = router;