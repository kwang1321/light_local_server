const redis = require("redis");
const client = redis.createClient();
const consts = require("../config/consts");
const service = require("../services/end_device");
const flatten = require("flat");

const errorHandler = (err, res) => {
  res.status(500);
  res.send(err);
};

module.exports = function(app) {
  // insert an item.
  app.post(consts.EndDeviceDomin, (req, res) => {
    const { body } = req;
    // console.log("body", body);

    if (!body || !body.ip || !body.eid) {
      res.status(400);
      res.send("body can not be null, body.ip and body.eid can not be null");
      return;
    }
    const info = flatten({
      ...body,
      eid: body.eid.split(":").join("_")
    });

    // console.log("info", info);

    service
      .saveToTable(client, info)
      .then(info => res.send({ result: info }))
      .catch(err => {
        errorHandler(err, res);
      });
  });

  // get all the end devices.
  app.get(consts.EndDeviceDomin, (req, res) => {
    service
      .getAllEndDevices(client)
      .then(infos => res.send(infos))
      .catch(err => errorHandler(err, res));
  });

  // get one end device
  app.get(consts.EndDeviceDomin + ":ip", (req, res) => {
    const ips = req.params.ip.split("_");
    if (!ips || ips.length !== 4) {
      res.status(400);
      res.send("use correct ip address, 127.0.0.1 as 127_0_0_1");
      return;
    }
    const ip = ips.join(".");
    service
      .getEndDevice(client, ip)
      .then(info => res.send(info))
      .catch(err => errorHandler(client, err));
  });
};
