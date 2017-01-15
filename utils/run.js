const shelljs = require("shelljs/global");
const log = require("./log");

/**
 * Call a command on the shell and print errors if there are any. If simulate is
 * true, print the command to the console instead
 */
module.exports = function run(command, simulate) {
  let cmd;
  if (simulate) {
    log(`\$ ${command}`, "debug");
  } else {
    cmd = exec(command);
    if (cmd.code !== 0) {
      log(`Command failed:\n\n${command}`, "error");
    }
  }
};
