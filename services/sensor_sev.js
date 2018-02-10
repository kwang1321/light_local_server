// this is model for class course.
const DDB = require("../config/DDB");
const Sensor = require("../models/sensor");
module.exports = {
  insert: (data, device_name, res) => {
    data.device_name = device_name;
    let sensorModel = new Sensor(data);
    // order has some information errors.
    if (!sensorModel.check()) {
      res.send({ error: "request parameters error, please check your parameters" });
      return;
    }

    var params = {
      TableName: Sensor.get_table_name(),
      Item: sensorModel.sensorDBModel,
      ReturnValues: DDB.returnType.ALL_OLD
    };

    try {
      DDB.docClient.put(params, function(err, data) {
        if (err) {
          console.log("error is " + err);
          res.send({ error: "putting item into dynamodb failed: " + err });
        } else {
          console.log("great success: " + JSON.stringify(data, null, 2));
          res.send(sensorModel);
        }
      });
    } catch (error) {
      console.log("error is :" + error);
      res.send({ error: "Caught: " + err });
    }
  },

  query_by_hashkey: (device_id, res) => {
    var params = {
      TableName: Sensor.get_table_name(),
      KeyConditionExpression: "#device_id = :device_id",
      ExpressionAttributeNames: {
        "#device_id": "device_id"
      },
      ExpressionAttributeValues: {
        ":device_id": device_id
      }
    };

    DDB.docClient.query(params, function(err, data) {
      if (err) {
        res.send({ error: "Error:" + JSON.stringify(err, null, 2) });
      } else {
        res.send(data.Items);
      }
    });
  }
};
