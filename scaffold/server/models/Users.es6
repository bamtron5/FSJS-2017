import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';
let Schema = mongoose.default.Schema;
let UserSchema = new Schema({
  username: { type: String, lowercase: true, unique: true},
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email']
  },
  passwordHash: {type: String, select: false},
  salt: {type: String, select: false},
  roles: {type: Array, default: ['user']}
});

UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
});

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return (hash === this.passwordHash);
});

UserSchema.method('generateJWT', function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
  }, process.env.JWT_SECRET, {expiresIn: '2 days'});
});

export const User = mongoose.default.model("User", UserSchema);
