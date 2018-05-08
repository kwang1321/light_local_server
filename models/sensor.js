const df = require("../common/date_format.js");
const _ = require("lodash");
const end_device_service = require("../services/end_device");
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
  }

  async getSensorDBModel() {
    await this.getEndDevice();
    return {
      device_id: this.device_id,
      device_name: this.device_name,
      time_stamp: this.time_stamp,
      end_device: this.end_device,
      info: this.info
    };
  }

  /**
   * get end device information from Redis
   */
  async getEndDevice() {
    if (
      this.end_device &&
      this.end_device.end_device_id &&
      this.end_device.end_device_id !== "unknown"
    ) {
      return;
    }

    try {
      const endDevices = await end_device_service.getAllEndDevices(client);
      const thisEndDevice = _.filter(endDevices, end_device =>
        _.some(end_device.sensors, { id: this.device_id })
      );
      if (!thisEndDevice || thisEndDevice.length === 0) {
        this.end_device = { ip: "unknown", end_device_id: "unknown" };
      } else if (thisEndDevice.length === 1) {
        this.end_device = {
          ip: thisEndDevice[0].ip,
          end_device_id: thisEndDevice[0].eid
        };
      } else {
        this.end_device = { ip: "cnf error", end_device_id: "cnf error" };
      }
    } catch (error) {
      console.log("error during getAllEndDevices", error);
      this.end_device = { ip: "cache error", end_device_id: "cache error" };
    }
  }

  check() {
    if (!(this.device_id && this.device_name && this.time_stamp)) return false;
    return true;
  }
}

module.exports = Sensor;
