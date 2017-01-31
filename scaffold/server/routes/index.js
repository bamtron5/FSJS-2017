import * as express from 'express';
import * as passport from 'passport';
let router = express.Router();

/* GET home page. */
router.get('/',
  function(req, res, next) {
    res.render('index');
    // app.get('env') === 'development' ? res.render('index') : res.render('dist');
  });

export default router;
