const redis = require("redis");
const client = redis.createClient();
const Repeat = require("repeat");
const { REMOTEDomin } = require("../config/consts");
const axios = require("axios");
const cacheService = require("./cache_sev");

const postToRemote = async (filter = "") => {
  const { data, keys } = await cacheService.loadFromCache(client, filter);
  if (!keys || keys.length === 0) {
    return { keys, data };
  }
  const res = await axios.post(REMOTEDomin, data.slice(0, 1));
  return { keys, data: res.data };
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
  Repeat(doPost)
    .every(3, "s")
    .start.now();
}

module.exports = { postToRemote };
