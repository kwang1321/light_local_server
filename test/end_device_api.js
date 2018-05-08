const service = require("../services/end_device");
const chai = require("chai");
const should = chai.should();
const consts = require("../config/consts");
var app = require("../server");
const expect = chai.expect;
const redis = require("redis");
const client = redis.createClient();

chai.use(require("chai-http"));
chai.use(require("chai-things"));

describe("End Devices Redis", () => {
  /*
  * Test the /GET route
  */
  describe("end_device service -> saveToTable", () => {
    it("save end_device", done => {
      let address = {
        eid: "cc:3d:82:52:81:31",
        ip: "127.0.0.1",
        sensors: [
          { id: "testid_0000_tmp_hum", interval: 5000 },
          { id: "testid_0002_current", interval: 5000 }
        ]
      };
      chai
        .request(app)
        .post(consts.EndDeviceDomin)
        .send(address)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.result.should.be.a("string");
          expect(res.body.result).to.equal("OK");
        });
      address = {
        eid: "cd:3d:82:52:ef:00",
        ip: "127.0.0.2",
        mac: "cd:3d:82:52:ef:00",
        sensors: [
          { id: "testid_0000_tmp_hum2", interval: 5000 },
          { id: "testid_0002_current2", interval: 5000 }
        ]
      };
      chai
        .request(app)
        .post(consts.EndDeviceDomin)
        .send(address)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.result.should.be.a("string");
          expect(res.body.result).to.equal("OK");
        });
      address = {
        eid: "test_pi_loc3",
        ip: "127.0.0.3",
        mac: "xxdfdsf-dsfwevx-sfd-sdfdsf",
        name: "slave1",
        sensors: [
          { id: "testid_0000_tmp_hum3", interval: 5000 },
          { id: "testid_0002_current3", interval: 5000 }
        ]
      };
      chai
        .request(app)
        .post(consts.EndDeviceDomin)
        .send(address)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.result.should.be.a("string");
          expect(res.body.result).to.equal("OK");
        });

      address = {
        ip: "127.0.0.4",
        mac: "xxdfdsf-dsfwevx-sfd-sdfdsf",
        name: "slave1",
        sensors: [
          { id: "testid_0000_tmp_hum4", interval: 5000 },
          { id: "testid_0002_current4", interval: 5000 }
        ]
      };
      chai
        .request(app)
        .post(consts.EndDeviceDomin)
        .send(address)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(400);
          should.exist(res.error);
          expect(res.error.text).to.equal(
            "body can not be null, body.ip and body.eid can not be null"
          );
        });
      done();
    });
  });

  describe("end_device service -> getAllEndDevices", () => {
    it("it should get all end devices", done => {
      chai
        .request(app)
        .get(consts.EndDeviceDomin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");

          res.body.should.all.have.property("ip");
          res.body.should.all.have.property("eid");
          res.body.should.all.have.property("sensors");

          // sensors should have property id and interval
          for (const info of res.body) {
            info.sensors.should.all.have.property("id");
            info.sensors.should.all.have.property("interval");
          }

          done();
        });
    });
  });
});

after(done => {
  client.quit();
  done();
});
