'use strict';

var _passport = require('passport');

var passport = _interopRequireWildcard(_passport);

var _Users = require('../models/Users');

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var LocalStrategy = require('passport-local').Strategy;

passport.default.serializeUser(function (user, done) {
  done(null, user);
});

passport.default.deserializeUser(function (obj, done) {
  _Users.User.findOne({ _id: obj._id }, { passwordHash: 0, salt: 0 }, function (err, user) {
    if (err) done(null, {});
    done(null, user);
  });
});

passport.default.use(new LocalStrategy(function (username, password, done) {
  _Users.User.findOne({ username: username }).select('+passwordHash +salt').exec(function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (!user.validatePassword(password)) return done(null, false, { message: 'Password does not match.' });
    user.passwordHash = undefined;
    user.salt = undefined;
    return done(null, user);
  });
}));