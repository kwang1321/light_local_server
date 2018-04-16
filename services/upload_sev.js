const redis = require("redis");
const client = redis.createClient();
const Repeat = require("repeat");
const { REMOTEDomin, uploadInteval } = require("../config/consts");
const axios = require("axios");
const cacheService = require("./cache_sev");

/**
 * two much data needed to be uploaded.
 * choose one record for each sensor to reduce the amout of uploaded data.
 * @param {*} keys
 * @param {*} data
 */
const doFilter = (keys, data) => {
  let uploadKeys = [];
  let uploadData = [];
  let visited = new Set();
  for (let i = 0; i < keys.length; i++) {
    const currKey = keys[i];
    const sensorKey = currKey.substring(0, currKey.lastIndexOf(":"));
    if (!visited.has(sensorKey)) {
      visited.add(sensorKey);
      uploadKeys.push(keys[i]);
      uploadData.push(data[i]);
    }
  }
  return { uploadKeys, uploadData };
};

const postToRemote = async (filter = "") => {
  const { data, keys } = await cacheService.loadFromCache(client, filter);
  if (!keys || keys.length === 0) {
    return { keys, data };
  }

  const { uploadData } = doFilter(keys, data);

  console.log("uploadData data to cloud, filtered data length is ", uploadData.length);

  const res = await axios.post(REMOTEDomin, uploadData);
  return { keys, data: res.data, length: uploadData.length };
};

let lock = 0;
function doPost() {
  if (lock === 1) {
    return;
  }
  console.log("doPost starting...");

  lock = 1;
  postToRemote()
    .then(({ keys, data }) => {
      if (!keys || keys.length === 0) {
        console.log("no data in redis!");
        lock = 0;
        return;
      }
      cacheService
        .delByKeys(client, keys)
        .then(info => {
          console.log("upload delete correctly:", data);
          lock = 0;
        })
        .catch(err => {
          console.log("upload delete error:", err);
          lock = 0;
        });
    })
    .catch(err => {
      console.log(err);
      lock = 0;
    });
}
if (!module.parent) {
  console.log(`*** upload starting, interval is ${uploadInteval} ***`);
  Repeat(doPost)
    .every(uploadInteval, "s")
    .start.now();
}

module.exports = { postToRemote };
