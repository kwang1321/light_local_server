// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
var AWS = require("aws-sdk");

AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 2013.");

var params = {
  TableName: "Movies",
  KeyConditionExpression: "#yr = :yyyy",
  ExpressionAttributeNames: {
    "#yr": "year"
  },
  ExpressionAttributeValues: {
    ":yyyy": 2013
  }
};

docClient.query(params, function(err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    data.Items.forEach(function(item) {
      // console.log(item);
      console.log(" -", item.year + ": " + item.title);
    });
  }
});
