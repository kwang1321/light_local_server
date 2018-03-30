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

describe("Cache Test", () => {
  /*
  * Test the /GET route
  */
  describe("cache service -> saveToTable", () => {
    it("it should save an obj into cache", done => {
      service
        .saveToCache(client, {
          device_id: "testid",
          time_stamp: 6666,
          device_name: "DH11",
          info: { temperature: 25, humidity: 36.2 }
        })
        .then(res => expect(res).to.equal("OK"))
        .catch(err => console.log(err));
      service
        .saveToCache(client, {
          device_id: "testid",
          time_stamp: 7777,
          device_name: "DH11",
          info: { temperature: 25, humidity: 36.2 }
        })
        .then(res => expect(res).to.equal("OK"))
        .catch(err => console.log(err));
      service
        .saveToCache(client, {
          device_id: "testid",
          time_stamp: 8888,
          device_name: "DH11",
          info: { temperature: 25, humidity: 36.2 }
        })
        .then(res => expect(res).to.equal("OK"))
        .catch(err => console.log(err));
      // console.log("res", res);
      done();
    });
  });

  describe("cache service -> loadOneFromCache", () => {
    it("it should get one data from cache", done => {
      service
        .loadOneFromCache(client, "sensor:testid:6666")
        .then(res => {
          res.should.be.a("object");
          res.should.have.property("device_id");
          res.should.have.property("time_stamp");
          expect(res.device_id).to.equal("testid");
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
          expect(res.data.length).to.equal(3);
          expect(res.keys.length).to.equal(3);
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
          res.data.should.be.a("string");
          expect(res.data).to.equal("insert correctly");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  //   describe("cache service -> delFromCache", () => {
  //     it("it should delete all data from cache", done => {
  //       service
  //         .delFromCache(client, "testid")
  //         .then(res => {
  //           res.should.be.a("string");
  //           expect(res).to.equal("OK");
  //           done();
  //         })
  //         .catch(err => {
  //           done(err);
  //         });
  //     });
  //   });
});

after(done => {
  client.quit();
  done();
});
