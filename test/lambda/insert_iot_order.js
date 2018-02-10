console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

let EPOCH = 1300000000000;

function generateRowId() {
    var ts = new Date().getTime() - EPOCH; // limit to recent
    var randid = Math.floor(Math.random() * 512);
    ts = (ts * 64); // bit-shift << 6
    ts = ts + randid;
    return (ts * 512) + (randid % 512);
}

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event, null, '  '));
    // dynamodb.listTables(function(err, data) {
    //     console.log(JSON.stringify(data, null, '  '));
    // });
    if(!(event.customer_name && event.credit_card_info && event.shipping_address && event.telephone_number && event.product_number)) {
        context.fail("request parameters error, please check your parameters");
    }
    var tableName = "iot_order";
    var datetime = new Date().getTime().toString();
    var order_id = event.product_number + "_" + generateRowId();
    console.log("order_id : " + order_id);
    var item = {
        "order_id": { "S": order_id.toString() },
        "customer_name": { "S": event.customer_name },
        "credit_card_info": { "S": event.credit_card_info },
        "shipping_address": { "S": event.shipping_address },
        "telephone_number": { "S": event.telephone_number },
        "product_number": { "S": event.product_number },
        "date": { "S": datetime },
        "location": { "S": "null" },
        "temperature": { "S": "null" },
        "humidity": { "S": "null" }
    };
    var return_item = {};
    for (let key in item) {
        let values = item[key];
        console.log(values);
        return_item[key] = values["S"];
    }
    try {
        dynamodb.putItem({
            "TableName": tableName,
            "Item": item,
            // ReturnConsumedCapacity: "TOTAL", 
            "ReturnValues": "ALL_OLD"
        }, function(err, data) {
            if (err) {
                console.log("error is " + err);
                context.done('error', 'putting item into dynamodb failed: ' + err);
            } else {
                console.log('great success: ' + JSON.stringify(data, null, '  '));
                callback(null, return_item)
            }
        });
    } catch (error) {
        console.log("error is :" + error);
        context.fail("Caught: " + error);
    }
};