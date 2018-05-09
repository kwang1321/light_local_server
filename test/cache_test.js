const service = require("../services/cache_sev");
const uploadService = require("../services/upload_sev");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();
const consts = require("../config/consts");
const expect = chai.expect;
const redis = require("redis");
const client = redis.createClient();
const Sensor = require("../models/sensor");

describe("Redis Cache Test", () => {
  /*
  * Test the /GET route
  */
  describe("cache service -> Save device information into Redis", () => {
    it("it should save device information into Redis", done => {
      // 1. test id testid_0000_tmp_hum
      const data1 = {
        device_id: "testid_0000_tmp_hum",
        time_stamp: 6666,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor1 = new Sensor(data1);
      sensor1.getEndDevice().then(async () => {
        const dbModel = await sensor1.getSensorDBModel();
        service
          .saveToCache(client, dbModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err));
      });

      // 2. testid_0000_tmp_hum with different time
      const data2 = {
        device_id: "testid_0000_tmp_hum",
        time_stamp: 7777,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor2 = new Sensor(data2);
      sensor2.getEndDevice().then(async () => {
        const dbModel = await sensor2.getSensorDBModel();
        service
          .saveToCache(client, dbModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err));
      });

      // 3. test testid_0002_current
      const data3 = {
        device_id: "testid_0002_current",
        time_stamp: 8888,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor3 = new Sensor(data3);
      sensor3.getEndDevice().then(async () => {
        const dbModel = await sensor3.getSensorDBModel();
        service
          .saveToCache(client, dbModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err));
      });

      // 4. test testid_0002_current with differnt time
      const data4 = {
        device_id: "testid_0002_current",
        time_stamp: 88889999,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor4 = new Sensor(data4);
      sensor4.getEndDevice().then(async () => {
        const dbModel = await sensor4.getSensorDBModel();
        service
          .saveToCache(client, dbModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err));
      });

      // 5. testid_0001_tmp_hum
      const data5 = {
        device_id: "testid_0001_tmp_hum",
        time_stamp: 8888,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor5 = new Sensor(data5);
      sensor5.getEndDevice().then(async () => {
        const dbModel = await sensor5.getSensorDBModel();
        service
          .saveToCache(client, dbModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err));
      });
      done();
    });
  });

  describe("cache service -> Get one sensor information from Redis", () => {
    it("it should get one sensor information from Redis", done => {
      service
        .loadOneFromCache(client, "sensor:testid_0000_tmp_hum:6666")
        .then(res => {
          res.should.be.a("object");
          res.should.have.property("device_id");
          res.should.have.property("time_stamp");
          expect(res.device_id).to.equal("testid_0000_tmp_hum");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("cache service -> Get all Test Devices Data from Redis", () => {
    it("it should get all Test Devices Data from Redis", done => {
      service
        .loadFromCache(client, "testid")
        .then(res => {
          res.should.be.a("object");
          res.data.should.be.a("array");
          res.data[0].should.have.property("device_id");
          res.data[0].should.have.property("time_stamp");
          res.data[0].should.have.property("device_name");
          res.data[0].should.have.property("info");
          expect(res.data.length).to.equal(6);
          expect(res.keys.length).to.equal(6);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("upload service -> Post Test Devices Data to remote", () => {
    it("it should post Test Devices Data to remote", done => {
      uploadService
        .postToRemote("testid")
        .then(res => {
          res.should.be.a("object");
          res.should.have.property("keys");
          res.should.have.property("data");
          res.should.have.property("length");
          res.data.should.be.a("string");
          expect(res.data).to.equal("insert correctly");
          expect(res.length).to.equal(3);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  // describe("cache service -> delFromCache", () => {
  //   it("it should delete all data from Redis", done => {
  //     service
  //       .delFromCache(client, "testid")
  //       .then(res => {
  //         res.should.be.a("string");
  //         expect(res).to.equal("OK");
  //         done();
  //       })
  //       .catch(err => {
  //         done(err);
  //       });
  //   });
  // });
});

after(done => {
  client.quit();
  done();
});
