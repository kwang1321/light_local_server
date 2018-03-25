const LOC_ENV = require("./LOC_ENV");
const PREFIX = "/api/v1/";
module.exports = {
  EPOCH: 1300000000000,
  ClassCourseDomin: PREFIX + "iotclass/",
  DH11Domin: PREFIX + "dh11/",
  RFIDDomin: PREFIX + "rfid/",
  BroadcastDomin: PREFIX + "broadcast/:action",
  REMOTEDomin: `https://wkh47ps425.execute-api.us-west-2.amazonaws.com/lightlocal${PREFIX}dh11/`
};

if (LOC_ENV.Release === "RELEASE") {
  console.log("this is a RELEASE version");
  module.exports.ENV = require("./prod.js");
} else {
  module.exports.ENV = require("./dev.js");
}
