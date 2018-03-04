const consts = require("../config/consts");
const dh11Service = require("../services/sensor_sev");
const remoteService = require("../services/remote_sev");
const df = require("../common/date_format.js");
const Sensor = require("../models/sensor");

module.exports = app => {
  // insert an item.
  app.post(consts.DH11Domin, (req, res) => {
    console.log("post dh11services");
    const data = { ...req.body, device_name: "DH11" };
    let sensorModel = new Sensor(data);
    if (!sensorModel.check()) {
      res.send({
        error: "request parameters error, please check your parameters"
      });
      return;
    }
    dh11Service.insert(sensorModel, res);
    remoteService.postToRemote(sensorModel.sensorDBModel);
  });

  // get item by dh11.id
  app.get(consts.DH11Domin + ":id", (req, res) => {
    let order_id = req.params.id;
    console.log("request order_id : ", order_id);
    dh11Service.query_by_hashkey(order_id, res);
  });

  // get item by dh11.id and start time(yyyy-mm-ddTHH:MM:ss)
  app.get(consts.DH11Domin + ":id/:stime", (req, res) => {
    let order_id = req.params.id;
    console.log("stime", req.params.stime);
    let stime = df.parseDateLocal(req.params.stime).getTime();
    // console.log("from time stime", df.parseDateLocal(stime).format(df.masks.isoDateTime3));
    dh11Service.query_by_id_time(order_id, res, stime);
  });

  // get item by dh11.id and start time(yyyy-mm-ddTHH:MM:ss) and end time
  app.get(consts.DH11Domin + ":id/:stime/:etime", (req, res) => {
    let order_id = req.params.id;
    let stime = df.parseDateLocal(req.params.stime).getTime();
    let etime = df.parseDateLocal(req.params.etime).getTime();
    dh11Service.query_by_id_time(order_id, res, stime, etime);
  });
};
