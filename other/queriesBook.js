var db = require('./connectionDB');
var authorQueries = require('./authorQueries.js');
var User = require('./userQueries.js');


const getBooks = (req, res, next) => {
    if(Object.keys(req.query).length > 0){ // 0 if empty or an integer > 0 if I have query parameters
      for (const key in req.query) {
        req.query[key] = req.query[key].toLowerCase();
      }
      let colName = Object.keys(req.query)[0];
      let value = req.query[colName];
      let validResearches = ["author", "price","favorite", "bestseller", "title", "genre", "theme"];
      if (validResearches.includes(colName, 4)){
        db.select('books.*', 'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').where(colName, 'ilike', '%'+value+'%').orderBy('id').then(function(data){
          res.send(data);
        });
      }
      else if(colName ==="favorite"){
        db.select('books.*',  'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').where('favorite', true).orderBy('id').then(function(result){
          res.send(result)
        });
      }
      else if(colName ==="bestseller"){
        db.select('bestseller.*', 'books.*', 'authors.name as authorName').from('bestseller').join('books', 'bestseller.bookid', '=', 'books.id').join('authors', 'books.authorid', '=', 'authors.id').then(function(result){
          res.send(result)
        });
      }
      else if (colName === "author"){
        authorQueries.getAuthorByName(value).then(function(result){
          db.select('books.*', 'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').where('authorid', result).orderBy('id').then(function(data){
            res.send(data);
          });
        });
      }
      else if (colName === "price"){
        let min = 0;
        let max = 0;
        if(value === "lessthan10"){
          min = 0;
          max = 10;
        }
        else if (value === 'between20'){
          min = 10;
          max = 20;
        }
        else if (value === 'between30'){
          min = 20;
          max = 30;
        }
        else{
          min = 30;
          max = 9999999;
        }
        //let knex('users').whereBetween('votes', [1, 100])
        db.select('books.*', 'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').whereBetween('price', [min, max]).orderBy('id').then(function(data){
          res.send(data);
        });
      }
      else{
        authorQueries.getAuthorByName(value).then(function(result){
          db.select('books.*', 'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').where('authorid', result).orderBy('id').then(function(data){
            res.send(data);
          });
        }).catch(function(result){
          db.select('books.*', 'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').where('title', 'ilike', '%'+value+'%').orWhere('genre', 'ilike', '%'+value+'%').orWhere('theme', 'ilike', '%'+value+'%').orderBy('id').then(function(data){
            res.send(data);
          });
        });
      }
    } else {
      db.select('books.*', 'authors.name as authorName').from('books').join('authors', 'books.authorid', '=', 'authors.id').where(req.query).orderBy('id').then(function(data){
        res.send(data);
      });
    }
};

const getBooksByID = (req, res, next) => {
  //if(Number.isInteger(parseInt(req.params.id, 10))){
  if(req.check('id').isNumeric()){
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

const myReviewScore = (req,res,next) => {
  db.avg('rating').from('reviews').where('bookid', req.params.id).then(function(data){
    res.send(data);
  })
}

const mySimilar = (req,res) => {
  let type= req.params.idSimilar;
  console.log(type);
  db.select().from('books').where("similar_type", type).whereNot('id', req.params.id).then(function(data){
    res.send(data);
  })
}

const getBestSeller = (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm;

  //just to have always events/books without updates of the db (it's just am univerisity project)
  if (yyyy> 2019)
    today = "2019-06"
    
  db.select('bestseller.*', 'books.title', 'books.price', 'books.authorid', 'authors.name').from('bestseller').join('books', 'bestseller.bookid', '=', 'books.id').join('authors', 'books.authorid', '=', 'authors.id').where('data_rank', 'ilike', '%'+today+'%').orderBy('position').then(function(result){
    res.send(result)
  });
}

module.exports = {
  getBooks,
  getBooksByID,
  myReviews,
  mySimilar,
  getBestSeller,
  myReviewScore
}
