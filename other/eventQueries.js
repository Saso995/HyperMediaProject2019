var db = require('./connectionDB');

const getEvents = (req, res) => {
    db.select().from('events').orderBy('date', 'asc').then(function(data){
      res.send(data);
    });
}

const getEventsByMonth = (req,res) => {
  let month = '2019-'+req.params.idMonth+'-%';
  db.select().from('events').where('date', 'ilike', month).then(function(data){
    console.log(data);
    if (data.length > 0){
      res.send(data);
    }
    else{
      res.json({
        message: "No events for this month"
      });
    }
  })
}

const getEventsByCity = (req,res,next) => {
  let value = req.params.cityName;
  let city;
  if(value == 1){
    city = 'Milano';
  }
  else if(value == 2){
    city = 'Roma';
  }
  else if(value == 3){
    city = 'Torino';
  }
  else if (value == 4){
    city = 'Napoli';
  }
  else if (value == 5){
    city = 'Reggio Calabria';
  }
  else if (value == 6){
    city = 'Palermo';
  }
  /*milano = 1, roma = 2 , torino = 3, napoli = 4, reggio = 5, palermo = 6*/
  if (value > 0 && value < 7){
    console.log(city)
    db.select().from('events').where('location', 'ilike', '%'+city+'%').orderBy('id').then(function(data){
      res.send(data);
    });
  }
  else{
    next(new Error("Invalid research"));
  }
}

const getEventByID = (req, res, next) => {
  if(req.check(req.params.id).isNumeric()){
    db.select('events.*', 'books.title as bookTitle', 'authors.name as authorName').from('events').join('books', 'events.bookid', '=', 'books.id').join('authors', 'events.authorid', '=', 'authors.id').where('events.id', req.params.id).then(function(data){
      if(Object.keys(data).length > 0){
        res.send(data);
      } else {
        next(new Error("No event found"));
      }
    });
  } else{
    next(new Error("Invalid input"));
  }
};

const getEventByBookID = (req, res, next) => {
  if(req.check(req.params.bookid).isNumeric()){
    db.select().from('events').where('bookid', req.params.bookid).then(function(data){
      if(Object.keys(data).length > 0){
        res.send(data);
      } else {
        res.send("For now there are no events for this book :(");
      }
    });
  } else{
    next(new Error("Invalid input"));
  }
};

const getEventThisMonth = (req, res, next) =>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  //just to have always events/books without updates of the db (it's just am univerisity project)
  /*if (yyyy> 2019)
    yyyy = 2019;*/


  today = yyyy + '-' + mm;
  today = "2019-06"
  db.select().from('events').where('date', 'ilike', "%"+today+"%").then(function(data){
    console.log(data)
    res.send(data);
  });
}

module.exports = {
  getEvents,
  getEventByID,
  getEventByBookID,
  getEventThisMonth,
  getEventsByCity,
  getEventsByMonth
}
