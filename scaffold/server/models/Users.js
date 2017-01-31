'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

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
var UserSchema = new Schema({
  username: { type: String, lowercase: true, unique: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email']
  },
  passwordHash: { type: String, select: false },
  salt: { type: String, select: false },
  roles: { type: Array, default: ['user'] }
});

UserSchema.method('setPassword', function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
});

UserSchema.method('validatePassword', function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return hash === this.passwordHash;
});

UserSchema.method('generateJWT', function () {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
  }, process.env.JWT_SECRET, { expiresIn: '2 days' });
});

var User = exports.User = mongoose.default.model("User", UserSchema);