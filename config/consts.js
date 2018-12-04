const LOC_ENV = require("./LOC_ENV");
const PREFIX = "/api/v1/";
const CLIENT_PREFIX = "/client/api/v1/";

let ENV = {};
if (LOC_ENV.Release === "RELEASE") {
  console.log("this is a RELEASE version");
  ENV = require("./prod.js");
} else {
  ENV = require("./dev.js");
}

module.exports = {
  EPOCH: 1300000000000,
  ClassCourseDomin: PREFIX + "iotclass/",
  DH11Domin: PREFIX + "dh11/",
  RFIDDomin: PREFIX + "rfid/",
  BroadcastDomin: PREFIX + "broadcast/:action",
  DomainInterval: PREFIX + "interval/",
  EndDeviceDomin: PREFIX + "enddevice/",
  REMOTEDomin: `https://wkh47ps425.execute-api.us-west-2.amazonaws.com/lightlocal/api/v1/dh11/`,
  ClientEndDeviceDomin: CLIENT_PREFIX + "enddevice/",
  ...ENV
};
