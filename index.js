var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
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
app.use(cookieParser('keyboard_cat')); //da modificare

authenticationRouter.use(bodyParser.json())

app.use('/', indexRouter);
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
