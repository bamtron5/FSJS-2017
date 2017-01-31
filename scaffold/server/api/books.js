import * as express from 'express';
import {Books} from './../models/Books';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
let router = express.Router();

//TODO Searchable with filters for active and popularity
//TODO cursor style
router.get('/books', (req, res, next) => {
  // let query = !_.isUndefined('req.query.page')
  //   ? {_id : { $gte : new mongoose.Types.ObjectId(req.query['page']) }}
  //   : {};
  let skip = !_.isUndefined('req.query.page') && Number(req.query['page'])
    ? (Number(req.query['page']) * 10) - 10
    : 0;
  Books.find({})
    .skip(skip)
    .limit(10).exec((e, result) => {
      if(e) next({message: 'could not retrieve books page', error: e});
      res.json(result)
    });
});

//TODO Validation
//TODO submission responses
router.post('/books', (req, res, next) => {

});

router.get('/books/count', (req, res, next) => {

});

router.delete('/books/:id', methods.isAdmin, (req, res, next) => {

});

router.get('/books/:id', (req, res, next) => {

});

export = router;
