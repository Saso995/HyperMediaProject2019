var db = require('./connectionDB');

module.exports = {
  getReview: function(bookid, userid){
    return db('reviews').where(
      {
        bookid : bookid,
        userid: userid
      }).first();
  },

  create: function(review){
    return db('reviews').insert(review, 'reviewid').then(ids =>{
      return ids[0];
    });
  }
}
