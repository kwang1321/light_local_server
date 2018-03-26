const AWS = require("aws-sdk");
const async = require("async");

AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2013;
var year2 = 2014;
var title = "This Is the End";

var params = {
  TableName: table,
  Key: {
    year,
    title
  }
};

var params2 = {
  TableName: table,
  Key: {
    year: year2,
    title
  }
};

function get1(cb) {
  docClient.get(params, cb);
}
function get2(cb) {
  docClient.get(params2, cb);
}

const ops = [get1, get2];
// Standard callbacks are all well and good when we’re following Node’s
// convention, but it’s a little bit laborious to check the result of every
// operation, and this can quickly get messy when there are many nested callbacks
// each with their own error handling code.
async.parallel(ops, (err, data) => {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
  }
});

// function(err, data) {
//     if (err) {
//       console.error(
//         "Unable to read item. Error JSON:",
//         JSON.stringify(err, null, 2)
//       );
//     } else {
//       console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//     }
//   }
