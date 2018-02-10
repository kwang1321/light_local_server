const consts = require("../config/consts");

module.exports.generateRowId = () => {
  var ts = new Date().getTime() - consts.EPOCH; // limit to recent
  var randid = Math.floor(Math.random() * 512);
  ts = ts * 64; // bit-shift << 6
  ts = ts + randid;
  let val = ts * 512 + randid % 512;
  return val.toString();
};
