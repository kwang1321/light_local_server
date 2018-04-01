const consts = require("../config/consts");

var PORT = consts.boradPort;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var ip = require("ip");
var mac = require("getmac");

ip.address();
var mymacAddress;
require("getmac").getMac(function(err, macAddress) {
  mymacAddress = macAddress;
  if (err) throw err;
  console.log(macAddress);
});
client.on("listening", function() {
  var address = client.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  client.setBroadcast(true);
});

client.on("message", function(message, rinfo) {
  console.log(
    "Message from: " + rinfo.address + ":" + rinfo.port + " - " + message
  );

  var ipdata = {
    ip: ip.address(),
    ["mac"]: mymacAddress
  };

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
        return console.log(error);
      }
      console.log("SUCCEED", data);
    }
  );
});

client.bind(PORT);
