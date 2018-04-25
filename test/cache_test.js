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

describe("Cache Test", () => {
  /*
  * Test the /GET route
  */
  describe("cache service -> saveToTable", () => {
    it("it should save an obj into cache", done => {
      // 1. test id testid_0000_tmp_hum
      const data1 = {
        device_id: "testid_0000_tmp_hum",
        time_stamp: 6666,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor1 = new Sensor(data1);
      sensor1.getEndDevice().then(() => {
        // console.log("sensor.sensorDBModel", sensor1.sensorDBModel);
        // expect(sensor1.sensorDBModel.end_device.end_device_id).to.equal(
        //   "cc_3d_82_52_81_31"
        // );
        // expect(sensor1.sensorDBModel.end_device.ip).to.equal("127.0.0.1");
        service
          .saveToCache(client, sensor1.sensorDBModel)
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
      sensor2.getEndDevice().then(() => {
        // expect(sensor2.sensorDBModel.end_device.end_device_id).to.equal(
        //   "cc_3d_82_52_81_31"
        // );
        service
          .saveToCache(client, sensor2.sensorDBModel)
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
      sensor3.getEndDevice().then(() => {
        // expect(sensor3.sensorDBModel.end_device.end_device_id).to.equal(
        //   "cd_3d_82_52_ef_00"
        // );
        service
          .saveToCache(client, sensor3.sensorDBModel)
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
      sensor4.getEndDevice().then(() =>
        service
          .saveToCache(client, sensor4.sensorDBModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err))
      );

      // 5. testid_0001_tmp_hum
      const data5 = {
        device_id: "testid_0001_tmp_hum",
        time_stamp: 8888,
        device_name: "DH11",
        info: { temperature: 25, humidity: 36.2 }
      };
      const sensor5 = new Sensor(data5);
      sensor5.getEndDevice().then(() => {
        // expect(sensor5.sensorDBModel.end_device.end_device_id).to.equal(
        //   "unknown"
        // );
        service
          .saveToCache(client, sensor5.sensorDBModel)
          .then(res => expect(res).to.equal("OK"))
          .catch(err => console.log(err));
      });
      // console.log("res", res);
      done();
    });
  });

  describe("cache service -> loadOneFromCache", () => {
    it("it should get one data from cache", done => {
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

  describe("cache service -> loadFromCache", () => {
    it("it should get all data from cache", done => {
      service
        .loadFromCache(client, "testid")
        .then(res => {
          res.should.be.a("object");
          res.data.should.be.a("array");
          res.data[0].should.have.property("device_id");
          res.data[0].should.have.property("time_stamp");
          res.data[0].should.have.property("device_name");
          res.data[0].should.have.property("info");
          expect(res.data.length).to.equal(5);
          expect(res.keys.length).to.equal(5);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("upload service -> postToRemote", () => {
    it("it should post cache data to remote", done => {
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
  //   it("it should delete all data from cache", done => {
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
