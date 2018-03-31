const consts = require("../config/consts");

module.exports = app => {
  app.post(consts.ClientEndDeviceDomin, (req, res) => {
    // courseService.insert(req.body, res);
    // {interval: 10}
    console.log(req.body);

    const interval = req.body.interval;
    console.log(interval);
    res.send({ result: interval });
  });

  app.get(consts.ClientEndDeviceDomin, (req, res) => {
    // let order_id = req.params.id;
    // console.log("request order_id : ", order_id);
    // courseService.get(order_id, res);
  });
};
