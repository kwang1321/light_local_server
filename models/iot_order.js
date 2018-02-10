const generator = require("../common/id_generator");
class IotOrder {
  static get_table_name() {
    return "iot_order";
  }
  constructor(data) {
    this.order_id = data.product_number + "_" + generator.generateRowId();
    this.customer_name = data.customer_name;
    this.credit_card_info = data.credit_card_info;
    this.shipping_address = data.shipping_address;
    this.telephone_number = data.telephone_number;
    this.product_number = data.product_number;
    this.date = new Date().getTime().toString();
    this.location = data.location || "null";
    this.temperature = data.temperature || "null";
    this.humidity = data.humidity || "null";
    this.iotOrderDB = {
      order_id: { S: this.order_id },
      customer_name: { S: this.customer_name },
      credit_card_info: { S: this.credit_card_info },
      shipping_address: { S: this.shipping_address },
      telephone_number: { S: this.telephone_number },
      product_number: { S: this.product_number },
      date: { S: this.date },
      location: { S: this.location },
      temperature: { S: this.temperature },
      humidity: { S: this.humidity }
    };
  }

  check() {
    if (!(this.customer_name && this.credit_card_info && this.shipping_address && this.telephone_number && this.product_number)) return false;
    return true;
  }
}

module.exports = IotOrder;
