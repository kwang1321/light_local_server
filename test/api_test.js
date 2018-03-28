//During the test the env variable is set to test
process.env.NODE_ENV = "test"; //Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
var app = require("../server");
const should = chai.should();
const consts = require("../config/consts");
const expect = chai.expect;

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
    it("it should GET all the items of DH11 000000007faf0e8e-Pi1", done => {
      chai
        .request(app)
        .get("/api/v1/dh11/000000007faf0e8e-Pi1")
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
    it("it should not POST a dh11", done => {
      let dh11 = {
        device_id: "000000007faf0e8e-Pi1",
        time_stamp: 1522122094168,
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
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("device_id");
          expect(res.body.device_id).to.equal("000000007faf0e8e-Pi1");
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
