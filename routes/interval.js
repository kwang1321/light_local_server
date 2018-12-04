const consts = require("../config/consts");
const DH11Service = require("../services/sensor_sev");
const dgram = require("dgram");
// const

module.exports = app => {
  app.route(consts.DomainInterval + ":id/:seconds")
  .get((req, res) => {
    const id = req.params.id;
    const seconds = req.params.seconds;

    console.log("GET id = " + id + ", seconds = " + seconds);
    res.send("GET Successful  id = " + id + ", interval = " + seconds);
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const seconds = req.params.seconds;

    console.log("PUT id = " + id + ", seconds = " + seconds);
    let result = await DH11Service.query_by_hashkey(id).catch(err => {
      res.send(err);
    });
    if (!result) return;
    let ipAddr = result[0].end_device.ip;
    console.log("result[0] = ", result[0]);
    const server = dgram.createSocket("udp4");

    let msgObj = {
      action: "setInterval",
      value: [result[0].device_id, seconds]
    };

    let message = new Buffer(JSON.stringify(msgObj));
    server.bind(function() {
      server.setBroadcast(true);

      server.send(
        message,
        0,
        message.length,
        6024,
        ipAddr,
        function() {
          console.log("Sent '" + message + "' Action");
          server.close();
        }
      );
    });
    res.send("Sent '" + message + "' TO ip:" + ipAddr + " successful!");
  });
};
