export const RFID = {
  RFID_URL: "https://7x4xxa5z82.execute-api.us-west-2.amazonaws.com/rfid/",
  UHF: "uhf",
  NFC: "nfc"
};

export const convertToDateString = timestamp => {
  var date = new Date(timestamp);

  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
