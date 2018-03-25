const consts = require("../config/consts");
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
// const

module.exports = app => {
  app.get(consts.BroadcastDomin, (req, res) => {});
};
