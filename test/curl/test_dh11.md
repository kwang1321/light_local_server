**test class course iot_order (POST)**

```
curl -v -X POST  'http://localhost:5000/api/v1/dh11'  -H 'content-type: application/json'  -d '{
"device_id": "dh11_xyzpp_sdfdsf_fx231",
"time_stamp": 1520160819166,
"info": {
    "temperature": 80.25,
    "humidity":50.34
  }
}' | json_pp
```

**test class course iot_order (GET)**

```
curl -v -X GET "http://localhost:5000/api/v1/dh11/dh11_xyzpp_sdfdsf_fx231" | json_pp
curl -v -X GET "https://wkh47ps425.execute-api.us-west-2.amazonaws.com/lightlocal/api/v1/dh11?id=dh11_xyzpp_sdfdsf_fx231&ts=1520158507891" | json_pp
```
