const consts = require("../config/consts");
// const { startread } = require("../clients/dht");
// let handle;
// = setInterval(function() {
//   //#B
//   read();
// }, 2000);
module.exports = app => {
  app.post(consts.ClientEndDeviceDomin, (req, res) => {
    // courseService.insert(req.body, res);
    // {interval: 10}
    console.log(req.body);

    const interval = req.body.interval;
    // startread(interval);

    console.log(interval);
    res.send({ result: interval });
  });

  app.get(consts.ClientEndDeviceDomin, (req, res) => {
    // let order_id = req.params.id;
    // console.log("request order_id : ", order_id);
    // courseService.get(order_id, res);
  });
};
