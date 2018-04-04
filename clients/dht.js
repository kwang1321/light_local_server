var sensorLib = require("node-dht-sensor");
var mac = require("getmac");
var mymacAddress;
require("getmac").getMac(function(err, macAddress) {
  mymacAddress = macAddress;
  if (err) throw err;
  console.log(macAddress);
});
//var did = mymacAddress;
console.log("node-dht-sensor");
sensorLib.initialize(11, 2); //#A

let handle;

const startread = (interval = 3000) => {
  if (handle) {
    console.log("clean handle!");
    clearInterval(handle);
    handle = null;
  }
  handle = setInterval(read, interval);
};

const read = () => {
  var readout = sensorLib.read(); //#C
  var a = Number(readout.temperature.toFixed(2));
  var b = Number(readout.humidity.toFixed(2));
  //var mydate=require('silly-datetime');
  //console.log(typeof(a));
  var time = Date.now();

  var data = {
    device_id: mymacAddress,
    time_stamp: time,
    info: {
      tmperature: a,
      humidity: b
    }
  };
  const request = require("request");
  const URL_POST = "http://localtest.itu.edu:5000/api/v1/dh11";

  request(
    {
      url: URL_POST,
      method: "POST",
      json: data
    },
    function(error, response, data) {
      if (error) {
        return console.log(error);
      }
      console.log("SUCCEED", data);
    }
  );

  //console.log(data);
};

process.on("SIGINT", function() {
  if (handle) clearInterval(handle);
  console.log("Bye, bye!");
  process.exit();
});

if (!handle) {
  console.log("starting...");
  startread();
} else {
  console.log("handle is not null");
}

module.exports.startread = startread;
