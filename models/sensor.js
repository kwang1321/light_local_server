const generator = require("../common/id_generator");
class Sensor {
  static get_table_name() {
    return "DevicesData";
  }
  constructor(data) {
    this.device_id = data.device_id;
    this.device_name = data.device_name;
    this.time_stamp = data.time_stamp;
    this.info = data.info;
    this.sensorDBModel = {
      device_id: this.device_id,
      device_name: this.device_name,
      time_stamp: this.time_stamp,
      info: this.info
    };
  }

  check() {
    if (!(this.device_id && this.device_name && this.time_stamp)) return false;
    return true;
  }
}

module.exports = Sensor;
