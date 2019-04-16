var db = require('./connectionDB');

const getBooks = (req, res) => {
    if(Object.keys(req.query).length > 0){ // 0 if empty or an integer > 0 if I have query parameters
      for (const key in req.query) {
        req.query[key] = req.query[key].toLowerCase();
      }
    }
    db.select().from('books').where(req.query).then(function(data){
      res.send(data);
    });
};

const getBooksByID = (req, res, next) => {
  if(Number.isInteger(parseInt(req.params.id, 10))){
    db.select().from('books').where('id', req.params.id).then(function(data){
      if(Object.keys(data).length > 0){
        res.send(data);
      } else {
        next(new Error("No book found"));
      }
    });
  } else{
    next(new Error("Invalid input"));
  }
};

module.exports = {
  getBooks,
  getBooksByID
}
