const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    host: 'ec2-54-246-121-32.eu-west-1.compute.amazonaws.com',
    database: 'deogk8jckp1m9i',
    password: 'fee5dc2195a33dd430be880a29ab15ab8f60e49a756ff40ba5d305408b80cbbf',
    port: 5432
  }
});

module.exports = knex;
