var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo');

// config variables
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var incomeRouter = require('./routes/income');
var expenseRouter = require('./routes/expense');
var auth = require('./middlewares/auth')

// connect to DB
mongoose.connect(
  'mongodb://127.0.0.1:27017/expenseTracker',
  { useNewUrlParser: true , useUnifiedTopology: true,},
  (err) => {
    console.log(err ?err :'Connected to Database');
  }
);

// setting passport
require('./modules/passport');

// instantiate express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

// createSession
app.use(
  session({
    secret: 'some random text',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/expenseTracker',
    }),
  })
);

// passport init
app.use(passport.initialize());
app.use(passport.session());

//adding user to req.user
app.use(auth.userInfo);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/income', incomeRouter);
app.use('/expense', expenseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
