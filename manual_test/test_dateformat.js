const df = require("../common/date_format");
let ddt = new Date(1518220800000);
console.log(ddt.format(df.masks.isoDateTime3));
console.log(ddt.format(df.masks.isoDateTime4));
let str = "2018-02-10T00:00:00";
let UTCstr = str + "Z";
let localtime = new Date(str).getTime();
let utcTime = new Date(UTCstr).getTime();
let localDate = new Date(localtime);
let utcDate = new Date(utcTime);
console.log(localDate.format(df.masks.isoDateTime3));
console.log(utcDate.format(df.masks.isoDateTime3));
/*  @param {string} s - an ISO 8001 format date and time string
**                      with all components, e.g. 2015-11-24T19:40:00
**  @returns {Date} - Date instance from parsing the string. May be NaN.
*/
function parseDateISOString(s) {
  let ds = s.split(/\D/).map(s => parseInt(s));
  ds[1] = ds[1] - 1; // adjust month
  return new Date(...ds);
}

var localdate2 = parseDateISOString("2018-02-10");
console.log(localdate2.format(df.masks.isoDateTime3));
