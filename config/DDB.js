const consts = require("./consts");
const AWS = require("aws-sdk");
AWS.config.update({
  region: consts.ENV.awsRegion,
  endpoint: consts.ENV.awsEndPoint
});
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
  dynamodb: dynamodb,
  docClient: docClient,
  returnType: {
    ALL_OLD: "ALL_OLD"
  }
};
