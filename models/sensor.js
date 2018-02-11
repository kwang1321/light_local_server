const df = require("../common/date_format.js");

class Sensor {
  static get_table_name() {
    return "DevicesData";
  }
  constructor(data) {
    this.device_id = data.device_id;
    this.device_name = data.device_name;
    this.time_stamp = data.time_stamp;
    let dat = new Date(this.time_stamp);
    this.datetime_format = dat.format(df.masks.isoDateTime4);
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
