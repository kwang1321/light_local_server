const consts = require("../config/consts");
const dht_000000 = require("../clients/dht_000000");
const dht_000001 = require("../clients/dht_000001");
const sensors = require("../clients/sensors");
const getSensorInfo = require("../clients/end_device_info");

// let handle;
// = setInterval(function() {
//   //#B
//   read();
// }, 2000);
module.exports = app => {
  app.post(consts.ClientEndDeviceDomin, (req, res) => {
    // courseService.insert(req.body, res);
    // {interval: 10}
    console.log(req.body);
    const sensorId = req.body.sensorId;
    const interval = req.body.interval;

    if (sensorId === sensors[0].id) {
      dht_000000.startread(interval);
      // res.send("ok");
      postToServer(req.body, res);
    } else if (sensorId === sensors[1].id) {
      dht_000001.startread(interval);
      postToServer(req.body, res);
      // res.send("ok");
    } else {
      // todo
    }

    res.send({ result: interval });
  });

  app.get(consts.ClientEndDeviceDomin, (req, res) => {
    // let order_id = req.params.id;
    // console.log("request order_id : ", order_id);
    // courseService.get(order_id, res);
  });
};

function postToServer(info, res) {
  let ipdata = getSensorInfo({ id: info.sensorId, interval: info.interval });

  const request = require("request");

  const URL_POST = "http://localtest.itu.edu:5000/api/v1/enddevice";

  request(
    {
      url: URL_POST,
      method: "POST",
      json: ipdata
    },
    function(error, response, data) {
      if (error) {
        res.send(error);
        return console.log(error);
      }
      res.send("ok");
      console.log("SUCCEED", data);
    }
  );
}
