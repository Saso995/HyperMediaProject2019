var db = require('./connectionDB');
var authorQueries = require('./authorQueries.js');
var User = require('./userQueries.js');


const getBooks = (req, res) => {
    if(Object.keys(req.query).length > 0){ // 0 if empty or an integer > 0 if I have query parameters
      for (const key in req.query) {
        req.query[key] = req.query[key].toLowerCase();
      }
      let colName = Object.keys(req.query)[0];
      let value = req.query[colName];
      if (colName !== "author's name"){
        db.select().from('books').where(colName, 'ilike', '%'+value+'%').then(function(data){
          res.send(data);
        });
      } else {
        authorQueries.getAuthorByName(value).then(function(result){
          db.select().from('books').where('authorid', result).then(function(data){
            res.send(data);
          });
        });
      }
    } else {
      db.select().from('books').where(req.query).then(function(data){
        res.send(data);
      });
    }
};

const getBooksByID = (req, res, next) => {
  if(Number.isInteger(parseInt(req.params.id, 10))){
    db.select().from('books').where('id', req.params.id).then(function(data){
      if(Object.keys(data).length > 0){
        let id = data[0].authorid;
        authorQueries.getName(id).then(function(result){
          var toSend = {
            "book": data,
            "authorName" : result
          }
          res.send(toSend);
        });
      } else {
        next(new Error("No book found"));
      }
    });
  } else{
    next(new Error("Invalid input"));
  }
};

const myReviews = (req, res, next) => {
  db.select().from('reviews').where('bookid', req.params.id).then(function(data){
    if(Object.keys(data).length > 0){
      var result = {};
      for (let i = 0; i < Object.keys(data).length; i++){
        User.getUserName(data[i].userid).then(username => {
          result[i] = {
            review: data[i],
            username: username.firstname + " " + username.lastname
          };
          if (i === Object.keys(data).length-1)
            res.send(result)
        });
      }
    }
    else {
      res.send("No reviews for this books!");
    }
  });
}

module.exports = {
  getBooks,
  getBooksByID,
  myReviews
}
