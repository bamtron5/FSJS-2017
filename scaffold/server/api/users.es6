import * as express from 'express';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import {User} from '../models/Users';
import * as _ from 'lodash';
let router = express.Router();

router.get('/users/:id', function(req, res, next) {
  User.findOne(req.params._id).select('-passwordHash -salt')
    .exec((e, user) => {
      e ? next({message: 'Could not find user.', error: e}) : null;
      let u = user.hasOwnProperty('username') ? user : {};
      return res.json(u);
    })
});

router.get('/currentuser', (req, res, next) => res.json(req.user));

router.post('/Register', function(req, res, next) {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    //this is a validation error so 400 bad req
    if(err) return next({message: 'user did not save', error: err});
    return res.json({message: "Registration complete."});
  });
});

router.post('/login/local', function(req, res, next) {
  if(!req.body.username && !req.body.password){
    return res.json({message: "Please fill out every field"});
  }

  passport.authenticate('local', {session: true}, function(err, user, info) {
    if(err) return next(err);
    if(user) {
      req.logIn(user, (err) => {
        if (err) return next({message: 'login failed', error: err});
        req.session.save(function (err){
          if (err) return next({message: 'session failed', error: err});
          return res.json(req.user);
        });
      });
    }
  })(req, res, next);
});

router.get('/logout/local', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next({message: 'still authenticated, please try again.', error: err});
    req.user = null;
    req.logout();
    return res.json({isAuthenticated: req.isAuthenticated()});
  });
});

export default router;
