var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Variables pour le chemins dans le dossier views
const viewsFolder = path.join(__dirname, 'views');
const layoutFolder = path.join(__dirname, 'views/layout');
const componentFolder = path.join(__dirname, 'views/component');

var app = express();

// view engine setup and add set of directories to lookout
app.set('views',[viewsFolder, layoutFolder, componentFolder]);
app.set('view engine', 'hbs');
// Change the location of your global dafault layout if necessary
app.set('views options', { layount: './layount/layount'})

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

module.exports = app;
