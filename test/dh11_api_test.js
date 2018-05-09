//During the test the env variable is set to test
process.env.NODE_ENV = "test"; //Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.use(require("chai-things"));
var app = require("../server");
const should = chai.should();
const consts = require("../config/consts");
const expect = chai.expect;
const DEV_ID = "000000007faf0e8e-Pi2";
const TEST_DEV_ID_1 = "testid_0000_tmp_hum";

// let address = {
//   eid: "cc:3d:82:52:81:31",
//   ip: "127.0.0.1",
//   sensors: [
//     { id: "testid_0000_tmp_hum", interval: 5000 },
//     { id: "testid_0002_current", interval: 5000 }
//   ]
// }

let server;
before(function(done) {
  server = app.listen(3000);
  done();
});
//Our parent block
describe("DH11&Test Sensor API", () => {
  /*
  * Test the /GET route
  */
  describe("/GET one DH11 Sensor", () => {
    it("it should GET all the items of DH11 Sensor " + DEV_ID, done => {
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
  * Test the /GET route
  */
  describe("/GET one Test Sensor", () => {
    it("it should GET all the items of DH11 Sensor " + TEST_DEV_ID_1, done => {
      chai
        .request(app)
        .get(consts.DH11Domin + TEST_DEV_ID_1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.should.all.have.property("device_id");
          res.body.should.all.have.property("datetime_format");
          res.body.should.all.have.property("info");
          res.body.should.all.have.property("end_device");
          const body0 = res.body[0];
          body0.info.should.be.a("object");
          body0.end_device.should.be.a("object");
          expect(body0.end_device.end_device_id).to.equal("cc_3d_82_52_81_31");
          done();
        });
    });
  });

  /*
  * Test the /POST test device 1
  */
  describe("/POST one Test Sensor", () => {
    it("it should POST one Test Sensor " + TEST_DEV_ID_1, done => {
      let dh11 = {
        device_id: TEST_DEV_ID_1,
        time_stamp: 1522225289489,
        info: {
          temperature: 810.25,
          humidity: 510.34
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
          expect(res.body.device_id).to.equal(TEST_DEV_ID_1);
          done();
        });
    });
  });
  /*
  * Test the /POST route
  */
  describe("/POST one DH11 Sensor", () => {
    it("it should POST one DH11 Sensor " + DEV_ID, done => {
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

    it("it should POST one DH11 Sensor " + DEV_ID, done => {
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
