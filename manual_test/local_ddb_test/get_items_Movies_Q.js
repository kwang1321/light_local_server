const AWS = require("aws-sdk");
const Q = require("q");

AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2013;
var year2 = 2014;
var title = "This Is the End";

var params = {
  TableName: table,
  Key: {
    year,
    title
  }
};

var params2 = {
  TableName: table,
  Key: {
    year: year2,
    title
  }
};

function get1(cb) {
  console.log("get1");
  docClient.get(params, cb);
}
function get2(cb) {
  docClient.get(params2, cb);
}

Q.fcall(get1)
  .then(get2)
  .catch(err => console.log("reading db error:", err))
  .done();
