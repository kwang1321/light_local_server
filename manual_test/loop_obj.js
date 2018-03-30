var obj = {
  name: "Simon",
  age: 20,
  clothing: {
    style: "simple",
    hipster: false
  }
};

// for (var propt in obj) {
//   console.log(propt + ": " + obj[propt]);
// }

Object.keys(obj).forEach(function(key, index) {
  // key: the name of the object key
  // index: the ordinal position of the key within the object
  console.log(key + " " + index);
  // do stuff
  let val = obj[key];
  if (toString.call(val) === "[object String]") {
    console.log("String");
  } else if (toString.call(val) === "[object Number]") {
    console.log("Number");
  } else {
    console.log(toString.call(val));
  }
});

const getInfoParam = info => {
  let obj = {};
  Object.keys(info).forEach(function(key, index) {
    let val = info[key];
    if (toString.call(val) === "[object String]") {
      obj[key] = { S: val };
    } else if (toString.call(val) === "[object Number]") {
      obj[key] = { N: val };
    }
  });
  return obj;
};

let params = {
  RequestItems: {
    [DDB.TableName]: props.map(item => {
      return {
        PutRequest: {
          Item: {
            device_id: { S: item.device_id },
            timestamp: { N: item.timestamp.toString() },
            device_name: { S: item.device_name.toString() },
            info: { M: getInfoParam(item.info) }
          }
        }
      };
    })
  }
};
