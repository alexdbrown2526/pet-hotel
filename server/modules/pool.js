const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'pet_hotel', // the name of the database
    host: 'localhost', // where is you database?
    port: '5432', // the port for your database, 5432 is default for postgres
    max: 10, // how many connections (queries) at one time 
    idleTimeoutMillis: 30000 // 30 seconds to try to connect, otherwise give up
});

pool.on('connect', () => {
    console.log('Postgresql connected!');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

module.exports = pool;