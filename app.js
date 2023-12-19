var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// dummy routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// necessary routers
var projectRouter = require('./routes/project');
var teamRouter = require('./routes/team');
var storiesRouter = require('./routes/stories');

// security router
var authenticationRouter = require('./routes/ysAuthentication');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app configurations
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// routings
app.use('/', indexRouter);
app.use('/projects', projectRouter);
app.use('/teams', teamRouter);
app.use('/users', usersRouter);
app.use('/stories', storiesRouter);
app.use('/authentication', authenticationRouter);

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

module.exports = app;