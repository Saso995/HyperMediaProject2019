var db = require('./connectionDB');

module.exports = {
  getOne: function (id){
    return db('users').where('id', id).first();
  },
  getUserName: function (id){
    return db.select('firstname', 'lastname').from('users').where('id', id).first();
  },
  getUserByEmail: function (email){
    return db('users').where('email', email).first();
  },
  create: function(user) {
    return db('users').insert(user, 'id').then(ids =>{
      return ids[0];
    })
  }
}
