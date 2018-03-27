var express = require("express");
var app = express();
var request = require("request");

app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
var bodyParser = require("body-parser");

// it is necesscory. Otherwise you can not get the request body.
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// for the text/plain
app.use(bodyParser.text());
app.set("view engine", "ejs");

require("./routes/test")(app);
require("./routes/classcourse")(app);
require("./routes/dh11")(app);
require("./routes/rfid")(app);
require("./routes/broadcast")(app);
require("./routes/webapp")(app, request);
require("./routes/error_handle")(app);

// for unit testing.
if (!module.parent) {
  var server = app.listen(5000);
  console.log("Server is running on port 5000");
}

module.exports = { app: app, server: server };
