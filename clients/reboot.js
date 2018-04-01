// var xec = require("child_process").exec;

const { exec } = require("child_process");
const reboot = () => {
  console.log("try to reboot");
  exec("cat *.js bad_file | wc -l", (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    } else {
      exec("sh ./reboot.sh", function(error, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        if (error !== null) {
          console.log("exec error: " + error);
        }
      });
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};
// const reboot = () => {
//   exec("sh ./reboot.sh", function(error, stdout, stderr) {
//     console.log("stdout: " + stdout);
//     console.log("stderr: " + stderr);
//     if (error !== null) {
//       console.log("exec error: " + error);
//     }
//   });
// };
module.exports.reboot = reboot;
