var sensorLib = require('node-dht-sensor');
var did='000000007faf0e8e-Pi1';

sensorLib.initialize(11, 2); //#A
var interval = setInterval(function () { //#B
read();
}, 2000);
function read() {
var readout = sensorLib.read(); //#C
var a=Number(readout.temperature.toFixed(2));
var b=Number(readout.humidity.toFixed(2));
//var mydate=require('silly-datetime');
//console.log(typeof(a));
var time=Date.now();

var data={
device_id:did,
time_stamp:time,
info:{
	tmperature:a,
	humidity:b
}
};
const request = require('request');

//const URL_GET = 'https://kgng8eutc9.execute-api.us-west-2.amazonaws.com/orders/new';

// 1. GET request
// request(URL_GET, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body);
// });

// 2. PUT request (the same as post)
const URL_POST = 'http://localtest.itu.edu:5000/api/v1/dh11';

request({
  url: URL_POST,
  method: 'POST',
  json: data
}, function(error, response, data){
  if (error) { return console.log(error); }
  console.log('SUCCEED', data);
});


//console.log(data);

};

process.on('SIGINT', function () {
clearInterval(interval);
console.log('Bye, bye!');
process.exit();
});