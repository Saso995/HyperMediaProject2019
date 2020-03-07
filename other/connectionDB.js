const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PSW,
    port: process.env.DB_PORT
  }
});

module.exports = knex;
