const pgp = require('pg-promise')();



// db config
const config = {
    host: 'localhost',
    port: 5432,
    database: 'covid_group',
    user: 'postgres',
    // **** change the password field back to pwd before you push any changes********
    password: '3Runners',

};

const db = pgp(config);

module.exports = db;
