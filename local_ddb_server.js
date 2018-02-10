const express = require("express");
const app = express();
const AWS = require("aws-sdk");
AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
const bodyParser = require("body-parser");
const tableName = "iot_order";

app.use(bodyParser.json());

let EPOCH = 1300000000000;

function generateRowId() {
  var ts = new Date().getTime() - EPOCH; // limit to recent
  var randid = Math.floor(Math.random() * 512);
  ts = ts * 64; // bit-shift << 6
  ts = ts + randid;
  return ts * 512 + randid % 512;
}
app.get("/", (req, res) => {
  res.send("This is server for dynamodb!");
});

//1. insert an order.
app.put("/orders", (req, res) => {
  let raw_order = req.body;
  if (!(raw_order.customer_name && raw_order.credit_card_info && raw_order.shipping_address && raw_order.telephone_number && raw_order.product_number)) {
    res.send({ error: "request parameters error, please check your parameters" });
    return;
  }

  var datetime = new Date().getTime().toString();
  var order_id = raw_order.product_number + "_" + generateRowId();
  console.log("order_id : " + order_id);
  var item = {
    order_id: { S: order_id.toString() },
    customer_name: { S: raw_order.customer_name },
    credit_card_info: { S: raw_order.credit_card_info },
    shipping_address: { S: raw_order.shipping_address },
    telephone_number: { S: raw_order.telephone_number },
    product_number: { S: raw_order.product_number },
    date: { S: datetime },
    location: { S: "null" },
    temperature: { S: "null" },
    humidity: { S: "null" }
  };
  var return_item = {};
  for (let key in item) {
    let values = item[key];
    console.log(values);
    return_item[key] = values["S"];
  }
  try {
    dynamodb.putItem(
      {
        TableName: tableName,
        Item: item,
        // ReturnConsumedCapacity: "TOTAL",
        ReturnValues: "ALL_OLD"
      },
      function(err, data) {
        if (err) {
          console.log("error is " + err);
          res.send({ error: "putting item into dynamodb failed: " + err });
        } else {
          console.log("great success: " + JSON.stringify(data, null, "  "));
          res.send(return_item);
        }
      }
    );
  } catch (error) {
    console.log("error is :" + error);
    res.send({ error: "Caught: " + err });
  }
});

// 2. get data by order_id
app.get("/orders/:id", (req, res) => {
  console.log(req.params.id);
  var order_id = req.params.id;
  console.log("order_id : " + order_id);
  // res.send({ result: "ok" });

  var params = {
    TableName: tableName,
    KeyConditionExpression: "#order_id = :order_id",
    ExpressionAttributeNames: {
      "#order_id": "order_id"
    },
    ExpressionAttributeValues: {
      ":order_id": order_id
    }
  };

  docClient.query(params, function(err, data) {
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
});
app.listen(5000);
console.log("Server is running on port 5000");
