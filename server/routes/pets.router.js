const express = require('express');
const pool = require('../modules/pool');

let router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "pets";`)
    //left outer JOIN "pets" ON "owners"."id" = "pets"."owner_id";`)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('error with SQL select for pets', error);
            res.sendStatus(500);
        });
        
});

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "pets" ("owner_id", "pet_name", "breed", "color"        )
                VALUES ($1, $2, $3, $4);`,
                 [req.query.owner_id,req.body.pet_name, req.body.breed, req.body.color])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with SQL inserting into pets', error);
            res.sendStatus(500);
        });



});

router.delete('/', (req, res) => {
    pool.query( `DELETE FROM "pets" WHERE "id"=$1;`, [req.query.id])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting pets from db', error);
        res.sendStatus(500);
        
    })
});



// router.put('/', (req, res) => {
//     pool.query(`UPDATE  "pets"
//     SET  "checked_in" = 'YES'
//     WHERE "id"=$1;`,
//                 [req.params.id])
//     .then(() => {
//         res.sendStatus(201);
//     }).catch(error => {
//         console.log('error updating checked in', error);
//         res.sendStatus(500);
//     });
// });


module.exports = router;