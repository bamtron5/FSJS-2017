'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Book = undefined;

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _crypto = require('crypto');

var crypto = _interopRequireWildcard(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _validator = require('validator');

var validator = _interopRequireWildcard(_validator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Schema = mongoose.default.Schema;

var BookSchema = new Schema({
  name: String
});
var Book = exports.Book = mongoose.default.model("Book", BookSchema);