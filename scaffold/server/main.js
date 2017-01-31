'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _ejs = require('ejs');

var ejs = _interopRequireWildcard(_ejs);

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _passport = require('passport');

var passport = _interopRequireWildcard(_passport);

var _expressSession = require('express-session');

var session = _interopRequireWildcard(_expressSession);

var _helmet = require('helmet');

var helmet = _interopRequireWildcard(_helmet);

var _morgan = require('morgan');

var morgan = _interopRequireWildcard(_morgan);

var _debug = require('debug');

var debug = _interopRequireWildcard(_debug);

var _Users = require('./models/Users');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MongoStore = require('connect-mongo')(session);

var app = express.default();
var isDev = app.get('env') === 'development' ? true : false;
//dev env
if (isDev) {
  var dotenv = require('dotenv');
  dotenv.load();
}

var server = require('http').Server(app);
var io = require('socket.io')(server);
var stack = { app: app, server: server, io: io };

app.enable('trust proxy');

//helmet (read the docs)
app.use(helmet.default());

//logging
app.use(morgan.default('dev'));

//config req.session your session
var sess = {
  maxAge: 172800000, // 2 days
  secure: false,
  httpOnly: true
};

//set to secure in production
if (!isDev) {
  sess.secure = true; // serve secure cookies
}

//use session config
app.use(session.default({
  cookie: sess,
  secret: process.env.SESSION_SECRET, // can support an array
  store: new MongoStore({
    url: process.env.MONGO_URI
  }),
  unset: 'destroy',
  resave: false,
  saveUninitialized: false //if nothing has changed.. do not restore cookie
}));

mongoose.default.connect(process.env.MONGO_URI);

//optional
mongoose.default.connection.on('connected', function () {
  console.log('mongoose connected');

  //if dev seed the deb
  if (isDev) {
    _Users.User.findOne({ username: 'admin' }, function (err, user) {
      if (err) return;
      if (user) return;
      if (!user) var admin = new _Users.User();
      admin.email = process.env.ADMIN_EMAIL;
      admin.username = process.env.ADMIN_USERNAME;
      admin.setPassword(process.env.ADMIN_PASSWORD);
      admin.roles = ['user', 'admin'];
      admin.save();
    });
  }
});

//optional
mongoose.default.connection.on('error', function (e) {
  throw new Error(e);
});

//config for passport login
require("./config/passport");

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//config bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.default.initialize());
app.use(passport.default.session());

//static routing
app.use('/vendor', express.static('vendor'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/client', express.static('client'));

//a server route
app.use('/', _index2.default);

//apis
app.use('/api', require('./api/books').default);
app.use('/api', require('./api/users').default);

// THIS IS THE INTERCEPTION OF ALL OTHER REQ
// After server routes / static / api
// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function (req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    // return isDev ? res.render('dist') : res.render('dist');
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (isDev) {
  app.use(function (err, res) {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err['message'],
      error: err //STACK TRACE
    });
  });
}

// production error handler
app.use(function (err, res) {
  res.status(err['status'] || 500);
});

exports.default = stack;