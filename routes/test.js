module.exports = function(app) {
  /*
  just for test
  */
  app.get("/hello", function(req, res) {
    // return ;
    res.send("Hello Express");
  });

  /*
  leading to list page.
  */
  app.get("/", function(req, res) {
    res.render("index.html");
  });
  /*
  leading to the insert form page.
  */
  app.get("/new", function(req, res) {
    console.log("new get");
    res.render("newItem.html");
  });
};
