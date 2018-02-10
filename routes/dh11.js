const consts = require("../config/consts");
const dh11Service = require("../services/sensor_sev");

module.exports = app => {
  // insert an item.
  app.post(consts.DH11Domin, (req, res) => {
    console.log("post dh11services");
    dh11Service.insert(req.body, "DH11", res);
  });

  // get item by dh11.id
  app.get(consts.DH11Domin + ":id", (req, res) => {
    let order_id = req.params.id;
    console.log("request order_id : ", order_id);
    dh11Service.query_by_hashkey(order_id, res);
  });
};
