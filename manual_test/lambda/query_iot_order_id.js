var AWS = require('aws-sdk');
// var dynamodb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    // TODO implement
    // callback(null, 'Hello from Lambda');
    console.log(JSON.stringify(event, null, '  '));
    
    var tableName = "iot_order";
    var order_id = event.order_id;
    var docClient = new AWS.DynamoDB.DocumentClient();
    console.log("order_id : " + order_id);
    
    var params = {
        TableName : tableName,
        KeyConditionExpression: "#order_id = :order_id",
        ExpressionAttributeNames:{
            "#order_id": "order_id"
        },
        ExpressionAttributeValues: {
            ":order_id" : order_id
        }
    };
    
    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded." + data.Items.length);
            // data.Items.forEach(function(item) {
            //     console.log(item);
            // });
            if (data.Items.length === 1)
                callback(null, data.Items[0]);
            else
                callback(null, {});
        }
    });
};

// create an IAM Lambda role with access to dynamodb
// Launch Lambda in the same region as your dynamodb region
// (here: us-east-1)
// dynamodb table with hash key = user and range key = datetime



// sample event
//{
//  "user": "bart",
//  "msg": "hey otto man"
//}