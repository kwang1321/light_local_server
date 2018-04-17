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
    it("it should save an endvice info into redis through POST", done => {
      let address = {
        end_device_id: "test_pi_loc1",
        ip: "127.0.0.1"
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
        end_device_id: "test_pi_loc2",
        ip: "127.0.0.2",
        mac: "xxdfdsf-dsfwevx-sfd"
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
        end_device_id: "test_pi_loc3",
        ip: "127.0.0.3",
        mac: "xxdfdsf-dsfwevx-sfd-sdfdsf",
        name: "slave1"
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
        name: "slave1"
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
            "body can not be null, body.ip and body.end_device_id can not be null"
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
          res.body.should.all.have.property("end_device_id");
          done();
        });
    });
  });
});

after(done => {
  client.quit();
  done();
});
