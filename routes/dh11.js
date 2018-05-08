const redis = require("redis");
const client = redis.createClient();
const consts = require("../config/consts");
const dh11Service = require("../services/sensor_sev");
const cacheService = require("../services/cache_sev");
const df = require("../common/date_format.js");
const Sensor = require("../models/sensor");

module.exports = app => {
  // insert an item.
  app.post(consts.DH11Domin, async (req, res) => {
    console.log("post dh11services");
    const data = { ...req.body, device_name: "DH11" };
    let sensorModel = new Sensor(data);
    if (!sensorModel.check()) {
      res.send({
        error: "request parameters error, please check your parameters"
      });
      return;
    }

    dh11Service
      .insert(sensorModel)
      .then(async result => {
        res.send(result);
        let dbModel = await result.getSensorDBModel();
        cacheService
          .saveToCache(client, dbModel)
          .catch(err => console.log("save to redis err:", err));
      })
      .catch(err => res.send(err));
  });

  // get item by dh11.id
  app.get(consts.DH11Domin + ":id", async (req, res) => {
    let order_id = req.params.id;
    console.log("request order_id : ", order_id);
    //  Remember that an async function returns a promise!
    //  No .catch() there will give you an unhandled rejection.
    const result = await dh11Service.query_by_hashkey(order_id).catch(err => {
      res.send(err);
    });
    if (!result) return;
    res.send(result);
  });

  // get item by dh11.id and start time(yyyy-mm-ddTHH:MM:ss)
  app.get(consts.DH11Domin + ":id/:stime", (req, res) => {
    let order_id = req.params.id;
    console.log("stime", req.params.stime);
    let stime = df.parseDateLocal(req.params.stime).getTime();
    dh11Service
      .query_by_id_time(order_id, stime)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  });

  // get item by dh11.id and start time(yyyy-mm-ddTHH:MM:ss) and end time
  app.get(consts.DH11Domin + ":id/:stime/:etime", (req, res) => {
    let order_id = req.params.id;
    let stime = df.parseDateLocal(req.params.stime).getTime();
    let etime = df.parseDateLocal(req.params.etime).getTime();
    dh11Service
      .query_by_id_time(order_id, stime, etime)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  });
};
