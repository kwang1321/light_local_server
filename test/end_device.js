const service = require("../services/end_device");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();
const consts = require("../config/consts");
const expect = chai.expect;
const redis = require("redis");
const client = redis.createClient();

describe("End Devices Redis", () => {
  /*
  * Test the /GET route
  */
  describe("end_device service -> saveToTable", () => {
    it("it should save an endvice info into redis", done => {
      service
        .saveToTable(client, { ip: "127.0.0.2" })
        .then(res => expect(res).to.equal("OK"))
        .catch(err => console.log(err));
      // console.log("res", res);
      done();
    });
  });

  describe("end_device service -> getEndDevice", () => {
    it("it should get an end device", done => {
      service
        .getEndDevice(client, "127.0.0.2")
        .then(res => {
          res.should.be.a("object");
          res.should.have.property("ip");
          expect(res.ip).to.equal("127.0.0.2");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("end_device service -> getAllEndDevices", () => {
    it("it should get all end devices", done => {
      service
        .getAllEndDevices(client)
        .then(res => {
          // console.log(res);
          res.should.be.a("array");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});

after(done => {
  client.quit();
  done();
});
