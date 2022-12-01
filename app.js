var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv/config')

const flash = require('connect-flash');
// var _ = require('lodash');
// // Load the core build.
// var _ = require('lodash/core');
// // Load the FP build for immutable auto-curried iteratee-first data-last methods.
// const fp = require('lodash/fp');

// // Load method categories.
// const array = require('lodash/array');
// const object = require('lodash/fp/object');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

require("./config/session.config")(app);


app.use(flash())

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  // console.log(res.locals.user)
  next()
})

// app.use(function(req, res, next){
//   req.session.user;
//   console.log('LOCAL', res.locals.user)
//   console.log('SESSION', req.session.user)
//   next()
// })




// app.use(function(req, res, next){
//   res.locals.user.email = req.session.user;
//   console.log('local user', res.locals.user, 'sessionuser', req.session.user)
//   next()
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

module.exports = app;
