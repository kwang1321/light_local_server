# Light Local Server for Sensors

## Setup & Information

1.  install dynamodb locally (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
2.  start dynamodb locally : **java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb**
3.  use command **'node test/local_ddb_test/create-table-Devices_data.js'** to create table named **DevicesData** locally.
4.  use command **npm run start** to start with static mode, use **npm run dev** to start with develop mode(if you modify Server side files, server will restart automatically).
5.  make sure to create **LOC_ENV.js** under config folder. using code:

```javascript
// if it is a DEVELOP version
module.exports = {
  Release: "DEV"
};
// if it is a RELEASE version
module.exports = {
  Release: "RELEASE"
};
```

6.  the code for client side can be finished in **client** folder.
7.  add your **hosts** file one information as **10.1.15.90 localtest.itu.edu**.

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
  curl -v -X POST  'http://localtest.itu.edu:5000/api/v1/dh11'  -H 'content-type: application/json'  -d '{
  "device_id": "dh11_xyzpp_sdfdsf_fx231",
  "time_stamp": 1518244416597,
  "info": {
      "temperature": 80.25,
      "humidity":50.34
    }
  }' | json_pp
  ```

* #### get data from DH11 sensor id, start*time, end_time [*/api/v1/dh11/{device*id}*] [_/api/v1/dh11/{device_id}/{start_time}_][_/api/v1/dh11/{device_id}/{start_time}/{end_time}_]

  example:

  ```
  curl -v -X GET "http://localtest.itu.edu:5000/api/v1/dh11/dh11_xyzpp_sdfdsf_fx231" | json_pp
  curl -v -X GET "http://localtest.itu.edu:5000/api/v1/dh11/dh11_xyzpp_sdfdsf_fx231/2018-02-10" | json_pp
  curl -v -X GET "http://localtest.itu.edu:5000/api/v1/dh11/dh11_xyzpp_sdfdsf_fx231/2018-02-09T23:22:23/2019-02-10T11:22:23" | json_pp
  ```

* #### Local Server broadcasts _discovery_ and _reset_. [*/api/v1/broadcast/:action*]. _action_ must be _reset_ or _discovery_

  example:

  ```
  curl http://localtest.itu.edu:5000/api/v1/broadcast/discovery
  curl http://localtest.itu.edu:5000/api/v1/broadcast/reset
  ```

* #### report end-devices address to localserver. [_/api/v1/enddevice_]

  data pattern:

  ```json
  {
    "ip": "Ip address of end-device",
    ["mac"]: "Mac address"
  }
  ```

  example:

  ```
  curl -v -X POST  'http://localtest.itu.edu:5000/api/v1/enddevice'  -H 'content-type: application/json'  -d '{
  "end_device_id": "02:42:50:ca:df:1e",
  "ip": "127.0.0.6",
  "mac": "02:42:50:ca:df:1e"
  }' | json_pp
  ```

* #### get all the end-devices from localserver. [_/api/v1/enddevice_]

```
  curl -v -X GET "http://localtest.itu.edu:5000/api/v1/enddevice" | json_pp
```
