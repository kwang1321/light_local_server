const AWS = require("aws-sdk");
const df = require("../../common/date_format");
AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});
const docClient = new AWS.DynamoDB.DocumentClient();

if (process.argv.length !== 5) {
  console.log("please use 'node get_items_DevicesData {device_id} {start_time} {end_time}' way'");
  return;
}

let device_id = process.argv[2];
let strstime = process.argv[3];
let stretime = process.argv[4];
const exportfilename = `${device_id}_data.ddb.txt`;

let writetofile = res => {
  var fs = require("fs");
  var logger = fs.createWriteStream(`./${exportfilename}`, {
    flags: "a" // 'a' means appending (old data will be preserved)
  });

  for (let i = 0; i < res.length; i++) {
    logger.write(JSON.stringify(res[i]) + "\n");
  }
};

let doQuery = params => {
  docClient.query(params, function(err, data) {
    if (err) {
      console.log("error", err);
    } else {
      let result = [];
      console.log(`${data.Items.length} items are found.`);
      for (let item of data.Items) {
        item.formatted_timestamp = new Date(item.time_stamp).format(df.masks.isoDateTime3);
        // console.log("item", item);
        result.push(item);
        writetofile(result);
      }
    }
  });
};

let query_by_id_time = (device_id, strstime, stretime = Date.now()) => {
  let stime = df.parseDateLocal(strstime).getTime();
  let etime = df.parseDateLocal(stretime).getTime();
  console.log(stime);
  console.log(new Date(stime).format(df.masks.isoDateTime3));
  console.log(new Date(etime).format(df.masks.isoDateTime3));
  var params = {
    TableName: "DevicesData",
    KeyConditionExpression: "#device_id = :device_id and time_stamp between :start and :end",
    ExpressionAttributeNames: {
      "#device_id": "device_id"
    },
    ExpressionAttributeValues: {
      ":device_id": device_id,
      ":start": stime,
      ":end": etime
    }
  };
  doQuery(params);
};

query_by_id_time(device_id, strstime, stretime);
