// this is model for class course.
const DDB = require("../config/DDB");
const Sensor = require("../models/sensor");
const df = require("../common/date_format.js");
const _ = require("lodash");

let doQuery = params => {
  return new Promise((resolve, reject) => {
    DDB.docClient.query(params, function(err, data) {
      if (err) {
        reject({ error: "Error:" + JSON.stringify(err, null, 2) });
      } else {
        const result = _.chain(data.Items)
          .map(item => new Sensor(item))
          .sort((r1, r2) => r2.time_stamp - r1.time_stamp)
          .value();
        resolve(result);
      }
    });
  });
  // DDB.docClient.query(params, function(err, data) {
  //   if (err) {
  //     res.send({ error: "Error:" + JSON.stringify(err, null, 2) });
  //   } else {
  //     let result = [];
  //     for (let item of data.Items) {
  //       result.push(new Sensor(item));
  //     }
  //     result.sort((r1, r2) => r2.time_stamp - r1.time_stamp);
  //     res.send(result);
  //   }
  // });
};

const SensorSev = {
  insert: async sensorModel => {
    var params = {
      TableName: Sensor.get_table_name(),
      Item: sensorModel.sensorDBModel,
      ReturnValues: DDB.returnType.ALL_OLD
    };

    return new Promise((resolve, reject) => {
      try {
        DDB.docClient.put(params, function(err, data) {
          if (err) {
            reject(err);
          } else {
            console.log(
              "great success: ",
              JSON.stringify(sensorModel.sensorDBModel, null, 2)
            );
            resolve(sensorModel);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  query_by_hashkey: device_id => {
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
    return doQuery(params);
  },

  query_by_id_time: (device_id, stime, etime = Date.now()) => {
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
    return doQuery(params);
  }
};
module.exports = SensorSev;
