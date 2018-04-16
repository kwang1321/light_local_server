const df = require("../common/date_format.js");
const { EndDeviceSensorCfg } = require("../config/consts");
const _ = require("lodash");
const service = require("../services/end_device");
const redis = require("redis");
const client = redis.createClient();

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
    if (data.end_device) {
      this.end_device = data.end_device;
    } else {
      this.end_device = { ip: "unknown", end_device_id: "unknown" };
    }
    this.sensorDBModel = {
      device_id: this.device_id,
      device_name: this.device_name,
      time_stamp: this.time_stamp,
      end_device: this.end_device,
      info: this.info
    };
  }

  async getEndDevice() {
    let idx = _.findIndex(EndDeviceSensorCfg, x =>
      x.sensors.includes(this.device_id)
    );
    console.log("idx is ", idx);

    if (idx === -1) {
      let unknown = { ip: "unknown", end_device_id: "unknown" };
      this.end_device = unknown;
      this.sensorDBModel.end_device = unknown;
      return;
    }
    const end_device = await service.getEndDevice(
      client,
      EndDeviceSensorCfg[idx].end_device_id
    );
    this.end_device = end_device;
    this.sensorDBModel.end_device = end_device;
  }

  check() {
    if (!(this.device_id && this.device_name && this.time_stamp)) return false;
    return true;
  }
}

module.exports = Sensor;
