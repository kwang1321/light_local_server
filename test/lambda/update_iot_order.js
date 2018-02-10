var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event, null, '  '));
    var docClient = new AWS.DynamoDB.DocumentClient();
    var tableName = "iot_order";
    var order_id = event.order_id;
    console.log("order_id : " + order_id);
    if (!event.location || !event.temperature || !event.humidity) {
        var err = "location, temperature and humidity can not be null";
        context.fail(err);
    }
    var params = {
        TableName:tableName,
        Key:{
            "order_id": order_id
        },
        UpdateExpression: "set #order_location = :loc, temperature=:tem, humidity=:hum",
        ConditionExpression: "order_id = :oid",
        ExpressionAttributeValues:{
            ":loc": event.location,
            ":tem": event.temperature,
            ":hum": event.humidity,
            ":oid": order_id
        },
        ExpressionAttributeNames: {
            "#order_location": "location"
        },
        
        ReturnValues: "ALL_NEW"
    };

    try {
        console.log("Updating the item...");
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                context.fail(err);
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                callback(null, data.Attributes);
            }
        });
    }
    catch (error) {
        console.log("error is :" + error);
        context.fail("Caught: " + error);
    }

}