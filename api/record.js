import express from 'express';

import {validate} from '../validation/record';
import record from '../models/record';

const app = express();

app.post('/', (req, res) => {
  const {startDate, endDate, minCount, maxCount} = req.body;
  if (validate(req.body).error) {
    return res.sendStatus(400);
   }
  record.aggregate([
    {
      $addFields: {
        totalCount: {$sum: '$counts'},
      }
    },
    { $addFields: {
        sentDateString: { 
            $dateToString: { 
                "format": "%Y-%m-%d", 
                "date": "$createdAt" 
            } 
        }
    } },
    {
      $match: {
        $and: [
          {
            sentDateString: {
              $gte: startDate,
              $lte: endDate,
            }
          },
          {
            totalCount: {
              $gte: minCount,
              $lte: maxCount
            }
          }
        ]
      }
    },
    {
      $project: {
        _id: 0,
        key: 1,
        totalCount: 1,
        createdAt: 1,
      }
    }
  ], (err, records) => {
    if (err) {
      return res.json({
        code: 1,
        msg: err.toString()
      })
    }
    return res.json({
      code: 0,
      msg: "Success",
      records,
    })
  })
})


app.post('/add', (req, res) => {
  record.find({}, (err, data) => {
    return res.json({
      data,
    })
  });
})

module.exports = app;
