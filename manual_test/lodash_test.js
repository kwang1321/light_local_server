const _ = require("lodash");
let res1 = _.includes([{ a: 1, b: 2 }, { c: 3, d: 4 }], { a: 1, b: 2 });
let res2 = _.some([{ a: 1, b: 2 }, { c: 3, d: 4 }], { a: 1 });
console.log(res1); // false
console.log(res2); // true
