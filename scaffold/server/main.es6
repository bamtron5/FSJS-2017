import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as debug from 'debug';
const MongoStore = require('connect-mongo')(session);

import {User} from './models/Users';
import routes from './routes/index';

let app = express.default();
const isDev = app.get('env') === 'development' ? true : false;
//dev env
if(isDev){
  let dotenv = require('dotenv');
  dotenv.load();
}

let server = require('http').Server(app);
let io = require('socket.io')(server);
let stack = {app: app, server: server, io: io};

app.enable('trust proxy');

//helmet (read the docs)
app.use(helmet.default());

//logging
app.use(morgan.default('combined'));

//config req.session your session
let sess = {
  maxAge: 172800000, // 2 days
  secure: false,
  httpOnly: true
}

//set to secure in production
if (!isDev) {
  sess.secure = true // serve secure cookies
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
mongoose.default.connection.on('connected', () => {
  console.log('mongoose connected');

  //if dev seed the deb
  if(isDev) {
    User.findOne({username: 'admin'}, (err, user) => {
      if(err) return;
      if(user) return;
      if(!user)
        var admin = new User();
        admin.email = process.env.ADMIN_EMAIL;
        admin.username = process.env.ADMIN_USERNAME;
        admin.setPassword(process.env.ADMIN_PASSWORD);
        admin.roles = ['user', 'admin'];
        admin.save();
    });

  }
});

//optional
mongoose.default.connection.on('error', (e) => {
  throw new Error(e);
});

//config for passport login
require("./config/passport");

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//config bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.default.initialize());
app.use(passport.default.session());

//static routing
app.use('/bower_components', express.static('bower_components'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/client', express.static('client'));

//a server route
app.use('/', routes);

//apis
app.use('/api', require('./api/books').default);
app.use('/api', require('./api/users').default);

// THIS IS THE INTERCEPTION OF ALL OTHER REQ
// After server routes / static / api
// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    // return isDev ? res.render('dist') : res.render('dist');
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (isDev) {
  app.use((err, res) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err['message'],
      error: err //STACK TRACE
    });
  });
}

// production error handler
app.use((err, res) => {
  res.status(err['status'] || 500);
});

export default stack;
