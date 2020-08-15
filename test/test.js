import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;




describe("record", () => {
  describe("post /", () => {
      // Test to record post
      it("post request record for bad request", (done) => {
           chai.request(app)
               .post('/record')
               .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": "count",
                "maxCount": 3000
               })
               .end((err, res) => {
                   res.should.have.status(400);
                   done();
                });
       });
       it("post request for normal request", (done) => {
        chai.request(app)
            .post('/record')
            .send({
             "startDate": "2016-01-26",
             "endDate": "2018-02-02",
             "minCount": 2700,
             "maxCount": 3000,
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.keys(
                  'code', 
                  'msg', 
                  'records', 
                  );
                  res.body.records[0].should.have.keys('key', "createdAt", "totalCount");
                done();
             });
       });
       it("post request for empty response", (done) => {
        chai.request(app)
            .post('/record')
            .send({
             "startDate": "2016-01-26",
             "endDate": "2018-02-02",
             "minCount": 0,
             "maxCount": 0,
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.keys(
                  'code', 
                  'msg', 
                  'records', 
                  );
                  expect(res.body.records).to.eql([]);
                done();
             });
       });
  });
});



