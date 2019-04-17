var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var db = require('./other/connectionDB');
var knexSessionStore = require('connect-session-knex')(expressSession);
var store = new knexSessionStore ({
  knex: db,
  tablename: "sessions"
});

var indexRouter = require('./routes/index'); //inutile per ora; CARICO LA HOME DIRETTAMENTE DA QUI
var backEndRouter = require('./routes/backend');
var bookRouter = require('./routes/book');
var authorRouter = require('./routes/author');
var eventRouter = require('./routes/event');
var authenticationRouter = require('./routes/auth');
var cartRouter = require('./routes/cart');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true })); search difference
app.use(expressValidator());
app.use(expressSession({
  secret: 'keyboard_cat',
  saveUninitialized: false,
  resave: false,
  store: store,
  cookie: {maxAge: 10 * 60 * 1000} //cart expires after 10 minutes
}));
app.use(cookieParser('keyboard_cat')); //da modificare

authenticationRouter.use(bodyParser.json())

app.use(express.static('./public/pages'));
app.use('/backend', backEndRouter);
app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/event', eventRouter);
app.use('/auth', authenticationRouter);
app.use('/cart', cartRouter);

app.listen(1337, function(){
  console.log("Listening at port 1337");
});

//catch 404 and forward to error Handler
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error Handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
