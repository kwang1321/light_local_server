**test class course iot_order (POST)**

```
curl -v -X POST  'http://localhost:5000/api/v1/iotclass/order'  -H 'content-type: application/json'  -d '{
"customer_name": "peter1",
"credit_card_info": "0000222233334444",
"shipping_address": "120 dixon landing",
"telephone_number": "740-234-1233",
"product_number": "222"
}' | json_pp
```

**test class course iot_order (GET)**

```
curl -v -X GET "http://localhost:5000/api/v1/iotclass/order/222_7151022442993579" | json_pp
```
