# HTTP APIS for cen646

### 1. **Add new order**

**url** : https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders

**method** : put

**example**:

```curl
curl -v -X PUT \
  'https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders' \
  -H 'content-type: application/json' \
  -d '{
  "customer_name": "jack3",
  "credit_card_info": "0000222233334444",
  "shipping_address": "120 dixon landing",
  "telephone_number": "740-234-1233",
  "product_number": "222"
  }' | json_pp

__respsonse__:
  {
   "product_number" : "222",
   "location" : "null",
   "temperature" : "null",
   "order_id" : "222_6953437082085556",
   "customer_name" : "jack3",
   "telephone_number" : "740-234-1233",
   "shipping_address" : "120 dixon landing",
   "date" : "1512202059387",
   "humidity" : "null",
   "credit_card_info" : "0000222233334444"
}
```

### 2. **update an order**

**url** : https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/{order_id}

**method** : post

**example**:

```curl
curl -v -X POST \
  'https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/222_6953437082085556' \
  -H 'content-type: application/json' \
  -d '{
  "humidity": "23.5",
  "location": "33,22",
  "temperature": "55"
  }' | json_pp

__respsonse__:
  {
   "shipping_address" : "120 dixon landing",
   "customer_name" : "jack3",
   "product_number" : "222",
   "humidity" : "23.5",
   "temperature" : "55",
   "order_id" : "222_6953437082085556",
   "location" : "33,22",
   "telephone_number" : "740-234-1233",
   "date" : "1512202059387",
   "credit_card_info" : "0000222233334444"
}
```

### 3. **get an order by order_id**

**url** : https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/{order_id}

**method** : get

**example**:

```curl
curl -v -X GET 'https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/222_6953437082085556' | json_pp
__respsonse__:
{
   "order_id" : "222_6953437082085556",
   "humidity" : "23.5",
   "shipping_address" : "120 dixon landing",
   "credit_card_info" : "0000222233334444",
   "product_number" : "222",
   "customer_name" : "jack3",
   "date" : "1512202059387",
   "temperature" : "55",
   "telephone_number" : "740-234-1233",
   "location" : "33,22"
}
```

### 4. **get all the new orders**

**url** : https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/new

**method** : get

**example**:

```curl
curl -v -X GET 'https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/new' | json_pp
```
