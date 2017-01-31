'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _passport = require('passport');

var passport = _interopRequireWildcard(_passport);

var _Users = require('../models/Users');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = express.Router();

router.get('/users/:id', function (req, res, next) {
  _Users.User.findOne(req.params._id).select('-passwordHash -salt').exec(function (e, user) {
    e ? next({ message: 'Could not find user.', error: e }) : null;
    var u = user.hasOwnProperty('username') ? user : {};
    return res.json(u);
  });
});

router.get('/currentuser', function (req, res, next) {
  return res.json(req.user);
});

router.post('/Register', function (req, res, next) {
  var user = new _Users.User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function (err, user) {
    //this is a validation error so 400 bad req
    if (err) return next({ message: 'user did not save', error: err });
    return res.json({ message: "Registration complete." });
  });
});

router.post('/login/local', function (req, res, next) {
  if (!req.body.username && !req.body.password) {
    return res.json({ message: "Please fill out every field" });
  }

  passport.authenticate('local', { session: true }, function (err, user, info) {
    if (err) return next(err);
    if (user) {
      req.logIn(user, function (err) {
        if (err) return next({ message: 'login failed', error: err });
        req.session.save(function (err) {
          if (err) return next({ message: 'session failed', error: err });
          return res.json(req.user);
        });
      });
    }
  })(req, res, next);
});

router.get('/logout/local', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) return next({ message: 'still authenticated, please try again.', error: err });
    req.user = null;
    req.logout();
    return res.json({ isAuthenticated: req.isAuthenticated() });
  });
});

exports.default = router;