'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _passport = require('passport');

var passport = _interopRequireWildcard(_passport);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
  // app.get('env') === 'development' ? res.render('index') : res.render('dist');
});

exports.default = router;