var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var params = {
  TableName: "DevicesData",
  KeySchema: [
    { AttributeName: "device_id", KeyType: "HASH" }, //Partition key
    { AttributeName: "time_stamp", KeyType: "RANGE" } //Sort key
  ],
  AttributeDefinitions: [{ AttributeName: "device_id", AttributeType: "S" }, { AttributeName: "time_stamp", AttributeType: "N" }],
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
