const flatten = require("flat");
const unflatten = require("flat").unflatten;
const { promisify } = require("util");
const SENSOR = "sensor:";

const saveToCache = async (client, data) => {
  const saveObjAsync = promisify(client.hmset).bind(client);
  const key = SENSOR + data.device_id + ":" + data.time_stamp;
  const res = await saveObjAsync(key, flatten(data));
  return res;
};

const loadOneFromCache = async (client, key) => {
  const getObjFromKeyAsync = promisify(client.hgetall).bind(client);
  const res = await getObjFromKeyAsync(key).catch(err => err);
  return unflatten(res);
};

const loadFromCache = async (client, filter = "") => {
  const getKeysAsync = promisify(client.keys).bind(client);
  const keys = await getKeysAsync(SENSOR + filter + "*");
  const res = { keys, data: [] };
  for (const key of keys) {
    res.data.push(await loadOneFromCache(client, key));
  }
  return res;
};

const delByKeys = async (client, keys) => {
  const deleteAsync = promisify(client.del).bind(client);
  await deleteAsync(keys);
};

const delFromCache = async (client, filter = "") => {
  const getKeysAsync = promisify(client.keys).bind(client);
  const keys = await getKeysAsync(SENSOR + filter + "*");
  delByKeys(client, keys);
  return "OK";
};

module.exports = {
  saveToCache,
  loadOneFromCache,
  loadFromCache,
  delFromCache,
  delByKeys
};
