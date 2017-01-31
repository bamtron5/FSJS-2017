import * as passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;
import {User} from '../models/Users';
import * as jwt from 'jsonwebtoken';
passport.default.serializeUser(function(user, done) {
  done(null, user);
});

passport.default.deserializeUser(function(obj, done) {
  User.findOne({_id: obj._id}, {passwordHash: 0, salt: 0}, (err, user) => {
    if (err) done(null, {});
    done(null, user);
  });
});

passport.default.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }).select('+passwordHash +salt')
    .exec(function(err, user) {
      if(err) return done(err);
      if(!user) return done(null, false, { message: 'Incorrect username.' });
      if(!user.validatePassword(password)) return done(null, false, { message: 'Password does not match.' });
      user.passwordHash = undefined;
      user.salt = undefined;
      return done(null, user);
    });
}));
