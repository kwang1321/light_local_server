const redis = require("redis");
const client = redis.createClient();
const flatten = require("flat");
const unflatten = require("flat").unflatten;
const { promisify } = require("util");
const getObjFromKeyAsync = promisify(client.hgetall).bind(client);
const getKeysAsync = promisify(client.keys).bind(client);
// client.on("connect", function() {
//   console.log("connected");
// });

// client.set("framework", "AngularJS", function(err, reply) {
//   console.log(reply);
// });

// client.hmset(
//   "frameworks",
//   "javascript",
//   "AngularJS",
//   "css",
//   "Bootstrap",
//   "node",
//   "Express"
// );

// client.hgetall("frameworks", function(err, object) {
//   console.log(object);
// });
const obj = {
  javascript: "AngularJS",
  css: "Bootstrap",
  node: "Express",
  info: {
    temp: 30,
    humity: 50
  }
};

client.del("frameworks");

client.hmset("frameworks:1", flatten(obj));
client.hmset("frameworks:2", flatten(obj));

// client.hgetall("frameworks*", function(err, object) {
//   console.log(unflatten(object));
//   // console.log(object.info);
//   client.quit();
// });

// client.keys("framework*", (err, keys) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   for (const key of keys) {
//     console.log(key);
//   }
//   client.quit();
// });

async function getAllKeys() {
  console.log("get keys starting...");
  const keys = await getKeysAsync("framework*");
  console.log(keys);
}

async function getKeyInfo() {
  console.log("get info starting...");
  const res = await getObjFromKeyAsync("frameworks:1").catch(err =>
    console.log(err)
  );
  console.log(res);
}
getAllKeys();
getKeyInfo();
client.quit();
