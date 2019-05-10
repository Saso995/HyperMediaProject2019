const knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'gkvpviahzxzody',
    host: 'ec2-54-228-252-67.eu-west-1.compute.amazonaws.com',
    database: 'd3fii9r6lupojg',
    password: '8e084bee26ad1d29645a1b3ac0a3789a651760aa337beaaf0957c4a093c47463',
    port: 5432
  }
});

module.exports = knex;
