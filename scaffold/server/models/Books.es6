import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';
let Schema = mongoose.default.Schema;

let BookSchema = new Schema({
  name: String
});
export const Book = mongoose.default.model("Book", BookSchema);
