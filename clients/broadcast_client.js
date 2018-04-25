const consts = require("../config/consts");

var PORT = consts.boradPort;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
const getSensorInfo = require("./end_device_info");
// var ip = require("ip");
// var mac = require("getmac");

const { reboot } = require("./reboot");
//var resetcmd = require("reboot");
// ip.address();
// var mymacAddress;
// require("getmac").getMac(function(err, macAddress) {
//   mymacAddress = macAddress;
//   if (err) throw err;
//   console.log(macAddress);
// });
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
  console.log(message.toString());

  let task = message.toString();
  if (task === "discovery") {
    // var ipdata = {
    //   ip: ip.address(),
    //   ["mac"]: mymacAddress
    // };

    let ipdata = getSensorInfo();

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
  }
  if (task === "reset") {
    //resetcmd.rebootImmediately();
    reboot();
  }
});

client.bind(PORT);
