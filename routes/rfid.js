const consts = require("../config/consts");
const df = require("../common/date_format.js");

module.exports = app => {
  // insert an item.
  app.all(consts.RFIDDomin, (req, res) => {
    console.log("post rfidservices");
    console.log("body", req.body);
    console.log("params", req.query);
    // dh11Service.insert(req.body, "DH11", res);
    res.send({ result: req.body });
  });
};
