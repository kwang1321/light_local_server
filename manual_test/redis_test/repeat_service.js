const Repeat = require("repeat");
let lock = 0;
function sayHello() {
  //   console.time("bb");
  if (lock === 1) {
    // console.timeEnd("bb");
    return;
  }
  console.time("aa");
  lock = 1;
  setTimeout(() => {
    console.log("Hello world!");
    lock = 0;
    console.timeEnd("aa");
  }, 6000);
}

Repeat(sayHello)
  .every(2, "s")
  .start.now();
