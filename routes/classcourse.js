const consts = require("../config/consts");
const courseService = require("../services/classcourse");

module.exports = app => {
  app.post(consts.ClassCourseDomin + "order", (req, res) => {
    courseService.insert(req.body, res);
  });

  app.get(consts.ClassCourseDomin + "order/:id", (req, res) => {
    let order_id = req.params.id;
    console.log("request order_id : ", order_id);
    courseService.get(order_id, res);
  });
};
