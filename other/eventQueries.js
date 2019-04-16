var db = require('./connectionDB');

const getEvents = (req, res) => {
  db.select().from('events').orderBy('date', 'asc').then(function(data){
    res.send(data);
  });
};

const getEventByID = (req, res, next) => {
  if(Number.isInteger(parseInt(req.params.id, 10))){
    db.select().from('events').where('id', req.params.id).then(function(data){
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

module.exports = {
  getEvents,
  getEventByID
}
