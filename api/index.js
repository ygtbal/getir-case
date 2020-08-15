import express from 'express';
import path from 'path';

const app = express();
const basename = path.basename(__filename);
require('fs')
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'
      );
    }).forEach((file) => {
      app.use(`/${file.split('.')[0]}`, require(__dirname + path.sep + file));
    });

module.exports = app;
