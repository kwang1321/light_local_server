// this is model for class course.
const DDB = require("../config/DDB");
const Sensor = require("../models/sensor");
const df = require("../common/date_format.js");

let doQuery = (params, res) => {
  DDB.docClient.query(params, function(err, data) {
    if (err) {
      res.send({ error: "Error:" + JSON.stringify(err, null, 2) });
    } else {
      let result = [];
      for (let item of data.Items) {
        result.push(new Sensor(item));
      }
      result.sort((r1, r2) => r2.time_stamp - r1.time_stamp);
      res.send(result);
    }
  });
};

const SensorSev = {
  insert: (sensorModel, res) => {
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
          console.log(
            "great success: ",
            JSON.stringify(sensorModel.sensorDBModel, null, 2)
          );
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
      // Limit: 2
    };
    doQuery(params, res);
  },

  query_by_id_time: (device_id, res, stime, etime = Date.now()) => {
    console.log(new Date(stime).format(df.masks.isoDateTime3));
    console.log(new Date(etime).format(df.masks.isoDateTime3));
    var params = {
      TableName: Sensor.get_table_name(),
      KeyConditionExpression:
        "#device_id = :device_id and time_stamp between :start and :end",
      ExpressionAttributeNames: {
        "#device_id": "device_id"
      },
      ExpressionAttributeValues: {
        ":device_id": device_id,
        ":start": stime,
        ":end": etime
      }
    };
    doQuery(params, res);
  }
};
module.exports = SensorSev;
