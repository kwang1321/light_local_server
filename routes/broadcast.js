const consts = require("../config/consts");
const dgram = require("dgram");
// const

module.exports = app => {
  app.get(consts.BroadcastDomin, (req, res) => {
    const action = req.params.action;
    if (!action || (action !== "discovery" && action !== "reset")) {
      res.status(400);
      res.send("please use discovery or reset as method!");
      return;
    }
    const server = dgram.createSocket("udp4");
    server.bind(function() {
      server.setBroadcast(true);
      var message = new Buffer(action);
      server.send(
        message,
        0,
        message.length,
        consts.ENV.boradPort,
        consts.ENV.broadAddress,
        function() {
          console.log("Sent '" + message + "' Action");
          res.send("Sent '" + message + "' Action");
          server.close();
        }
      );
    });
  });
};
