// npm install --save serverless-dynamodb-local

var AWS = require("aws-sdk");
var dyn = new AWS.DynamoDB({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

dyn.listTables(function(err, data) {
  console.log("listTables", err, data);
});
