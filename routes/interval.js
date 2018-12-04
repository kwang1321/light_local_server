const consts = require("../config/consts");
const DH11Service = require("../services/sensor_sev");
const dgram = require("dgram");
// const

module.exports = app => {
  app.route(consts.DomainInterval + ":id/:seconds")
  .get((req, res) => {
    const id = req.params.id;
    const seconds = req.params.seconds;

    console.log("GET id = " + id + ", seconds = " + seconds);
    res.send("GET Successful  id = " + id + ", interval = " + seconds);
  })
  .put(async (req, res) => {
    const id = req.params.id;
    const seconds = req.params.seconds;

    console.log("PUT id = " + id + ", seconds = " + seconds);
    let result = await DH11Service.query_by_hashkey(id).catch(err => {
      res.send(err);
    });
    if (!result) return;
    res.send(result);
  });
};
