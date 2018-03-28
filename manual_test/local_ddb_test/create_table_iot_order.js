var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var params = {
  TableName: "iot_order",
  KeySchema: [
    { AttributeName: "order_id", KeyType: "HASH" } //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "order_id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
