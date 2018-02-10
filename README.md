# Light Local Server for Sensors

## Setup & Information

1. install dynamodb locally (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
2. start dynamodb locally : **java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb**
3. use command **'node test/local_ddb_test/create-table-Devices_data.js'** to create table named **DevicesData** locally.
4. use command **npm run start** to start with static mode, use **npm run dev** to start with develop mode(if you modify Server side files, server will restart automatically).
5. make sure to create **LOC_ENV.js** under config folder. using code:
  ```json
  // if it is a DEVELOP version
  module.exports = {
    "Release": "DEV"
  };
  // if it is a RELEASE version
  module.exports = {
    "Release": "RELEASE"
  };
  ```
6. the code for client side can be finished in **client** folder.

## Interfaces

* #### add new DH11 sensor data. [_/api/v1/dh11_]

  data pattern:

  ```json
  {
    "device_id": "String of device_id",
    "time_stamp": "Number of dateTime",
    "info": {
      "temperature": "Number of temperature",
      "humidity": "Number of humidity",
      "...": "Additional Information"
    }
  }
  ```

  example:

  ```
  curl -v -X POST  'http://localhost:5000/api/v1/dh11'  -H 'content-type: application/json'  -d '{
  "device_id": "dh11_xyzpp_sdfdsf_fx231",
  "time_stamp": 1518244416597,
  "info": {
      "temperature": 80.25,
      "humidity":50.34
    }
  }' | json_pp
  ```

* #### get data from DH11 sensor id [_/api/v1/dh11/{device_id}_]

  example:

  ```
  curl -v -X GET "http://localhost:5000/api/v1/dh11/dh11_xyzpp_sdfdsf_fx231" | json_pp
  ```
