var db = require('./connectionDB');

const getAuthors = (req, res) => {
  db.select().from('authors').orderBy('name', 'asc').then(function(data){
    res.send(data);
  });
};

const getAuthorByID = (req, res, next) => {
  if(Number.isInteger(parseInt(req.params.id, 10))){
    db.select().from('authors').where('id', req.params.id).then(function(data){
      if(Object.keys(data).length > 0){
        db.select('id').from('books').where('authorid', req.params.id).then(function(books){
          var result = {
            "author": data,
            "myBooks" : books
          }
          res.send(result);
        });
      } else {
        next(new Error("No author found"));
      }
    });
  } else{
    next(new Error("Invalid input"));
  }
};


module.exports = {
  getAuthors,
  getAuthorByID
}
