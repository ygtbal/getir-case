import mongoose from 'mongoose';
import moment from 'moment';

const recordSchema = mongoose.Schema({
  key: {type: String},
  createdAt: {type: Date, default: Date.now},
  counts: {type: Array, default:[]}
})

module.exports = mongoose.model('record', recordSchema);

