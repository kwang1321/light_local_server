const consts = require("./consts");
const AWS = require("aws-sdk");
AWS.config.update({
  region: consts.awsRegion,
  endpoint: consts.awsEndPoint
});
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
  dynamodb,
  docClient,
  returnType: {
    ALL_OLD: "ALL_OLD"
  }
};
