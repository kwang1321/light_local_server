//During the test the env variable is set to test
process.env.NODE_ENV = "test"; //Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
var app = require("../server");
const should = chai.should();
const consts = require("../config/consts");
const expect = chai.expect;
const DEV_ID = "000000007faf0e8e-Pi2";

let server;
before(function(done) {
  server = app.listen(3000);
  done();
});
//Our parent block
describe("DH11", () => {
  /*
  * Test the /GET route
  */
  describe("/GET DH11", () => {
    it("it should GET all the items of DH11 " + DEV_ID, done => {
      chai
        .request(app)
        .get(consts.DH11Domin + DEV_ID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  /*
  * Test the /POST route
  */
  describe("/POST dh11", () => {
    it("it should a POST of dh11", done => {
      let dh11 = {
        device_id: DEV_ID,
        time_stamp: 1522225289489,
        info: {
          temperature: 80.25,
          humidity: 50.34
        }
      };
      chai
        .request(app)
        .post(consts.DH11Domin)
        .send(dh11)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.info.should.be.a("object");
          res.body.should.have.property("device_id");
          expect(res.body.device_id).to.equal(DEV_ID);
          done();
        });
    });

    it("it should a POST of dh11", done => {
      let dh11 = {
        device_id: DEV_ID,
        time_stamp: 1522225289500,
        info: {
          temperature: 800.25,
          humidity: 500.34
        }
      };
      chai
        .request(app)
        .post(consts.DH11Domin)
        .send(dh11)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.info.should.be.a("object");
          res.body.should.have.property("device_id");
          expect(res.body.device_id).to.equal(DEV_ID);
          done();
        });
    });
  });
});

after(function(done) {
  // console.log("server", server);
  server.close();
  done();
});
