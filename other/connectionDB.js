const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'me',
    host: 'localhost',
    database: 'bookstore',
    password: 'toor',
    port: 5432
  }
});

module.exports = knex;
