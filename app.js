import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {settings} from './bin/config';

const app = express();

const route = require('./api/index');


app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true' , {
  useNewUrlParser: true, 
  useUnifiedTopology: true});


app.use(async (err, req, res, next) => {
  if (err) {
      return res.status(400).json({
        type: false,
        data: err.toString(),
      });
    }
    next();

});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST');
    return res.status(200).json({});
  }
  next();
});


app.use('/', route);

const server = app.listen(settings.port, () => {
  console.log('running getir-case on port ' + settings.port);

})

module.exports = server;



