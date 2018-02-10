# Light Local Server for Sensors

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
