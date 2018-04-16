const { EndDeviceSensorCfg } = require("../config/consts");
const _ = require("lodash");
let idx = _.findIndex(EndDeviceSensorCfg, e =>
  e.sensors.includes("testid:cc:3d:82:52:81:312")
);

console.log("idx", idx);
