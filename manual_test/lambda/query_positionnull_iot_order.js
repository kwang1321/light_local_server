var AWS = require('aws-sdk');
// var dynamodb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    // TODO implement
    // callback(null, 'Hello from Lambda');
    // console.log(JSON.stringify(event, null, '  '));
    
    var tableName = "iot_order";
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var params = {
        TableName : tableName,
        FilterExpression: "#loc = :nul",
        ExpressionAttributeValues: {
            ":nul" : "null"
        },
        ExpressionAttributeNames: {
           "#loc": "location"
        }
    };
    
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded." + data.Items.length);
            data.Items.forEach(function(item) {
                console.log(item);
            });
            callback(null, data.Items);
        }
    });
};

