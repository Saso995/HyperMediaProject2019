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
        db.select('id','title', 'price').from('books').where('authorid', req.params.id).orWhere('authorid2', req.params.id).orWhere('authorid3', req.params.id).orWhere('authorid4', req.params.id).orderBy('id').then(function(books){
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

function getAuthorByName(authorName){
  return db.select('id').from('authors').where('name', 'ilike', '%'+authorName+'%').then(function(authorID){
    var result = JSON.stringify(authorID[0].id);
    return result;
  });
}

function getName(id){
  return db.select('name').from('authors').where('id', id).then(function(authorName){
    var result = authorName[0].name;
    return result;
  });
}



module.exports = {
  getAuthors,
  getAuthorByID,
  getAuthorByName,
  getName
}
