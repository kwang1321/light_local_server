var ip = require("ip");
var mac = require("getmac");
const sensors = require("./sensors");
const macaddress = require("macaddress");
let results = sensors;

var mymacAddress;
var done = false;
require("getmac").getMac(function(err, macAddress) {
  if (err) throw err;
  console.log(macAddress);
  mymacAddress = macAddress;
  done = true;
});
require("deasync").loopWhile(function() {
  return !done;
});

function getSensorInfo(newSensorInfo) {
  if (newSensorInfo) {
    newresults = [];
    for (let sensor of results) {
      if (sensor.id === newSensorInfo.id) {
        newresults.push({ ...sensor, ...newSensorInfo });
      } else {
        newresults.push(sensor);
      }
    }
    results = newresults;
  }

  //   let results = sensors.map(
  //     sensor =>
  //       sensor.id === newSensorInfo.id ? { ...sensor, ...newSensorInfo } : sensor
  //   );

  return {
    eid: mymacAddress,
    ip: ip.address(),
    sensors: results
  };
}

// console.log(getSensorInfo({ id: "dht_000000", interval: 600 }));
// console.log(getSensorInfo({ id: "dht_000001", interval: 500 }));
module.exports = getSensorInfo;
