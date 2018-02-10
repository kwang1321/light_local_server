// this is model for class course.
const DDB = require("../config/DDB");
const IotOrder = require("../models/iot_order");
module.exports.insert = (data, res) => {
  let orderModel = new IotOrder(data);
  // order has some information errors.
  if (!orderModel.check()) {
    res.send({ error: "request parameters error, please check your parameters" });
    return;
  }
  let item = orderModel.iotOrderDB;
  try {
    DDB.dynamodb.putItem(
      {
        TableName: IotOrder.get_table_name(),
        Item: item,
        // ReturnConsumedCapacity: "TOTAL",
        ReturnValues: DDB.returnType.ALL_OLD
      },
      function(err, data) {
        if (err) {
          console.log("error is " + err);
          res.send({ error: "putting item into dynamodb failed: " + err });
        } else {
          console.log("great success: " + JSON.stringify(data, null, "  "));
          res.send(orderModel);
        }
      }
    );
  } catch (error) {
    console.log("error is :" + error);
    res.send({ error: "Caught: " + err });
  }
};

module.exports.get = (order_id, res) => {
  var params = {
    TableName: IotOrder.get_table_name(),
    KeyConditionExpression: "#order_id = :order_id",
    ExpressionAttributeNames: {
      "#order_id": "order_id"
    },
    ExpressionAttributeValues: {
      ":order_id": order_id
    }
  };

  DDB.docClient.query(params, function(err, data) {
    if (err) {
      console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.send({ error: "Error:" + JSON.stringify(err, null, 2) });
    } else {
      console.log("Query succeeded." + data.Items.length);
      // data.Items.forEach(function(item) {
      //     console.log(item);
      // });
      if (data.Items.length === 1) res.send(data.Items[0]);
      else res.send({});
    }
  });
};
