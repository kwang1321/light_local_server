const { REMOTEDomin } = require("../config/consts");
const axios = require("axios");
module.exports.postToRemote = async data => {
  const res = await axios.post(REMOTEDomin, data);
  console.log(`${data.device_id} ${data.time_stamp} uploaded`);
};
