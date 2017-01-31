'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _Books = require('./../models/Books');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _crypto = require('crypto');

var crypto = _interopRequireWildcard(_crypto);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = express.Router();

//TODO Searchable with filters for active and popularity
//TODO cursor style
router.get('/books', function (req, res, next) {
  // let query = !_.isUndefined('req.query.page')
  //   ? {_id : { $gte : new mongoose.Types.ObjectId(req.query['page']) }}
  //   : {};
  var skip = !_.isUndefined('req.query.page') && Number(req.query['page']) ? Number(req.query['page']) * 10 - 10 : 0;
  _Books.Books.find({}).skip(skip).limit(10).exec(function (e, result) {
    if (e) next({ message: 'could not retrieve books page', error: e });
    res.json(result);
  });
});

//TODO Validation
//TODO submission responses
router.post('/books', function (req, res, next) {});

router.get('/books/count', function (req, res, next) {});

router.delete('/books/:id', function (req, res, next) {});

router.get('/books/:id', function (req, res, next) {});

exports.default = router;