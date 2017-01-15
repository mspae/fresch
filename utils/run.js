const shelljs = require("shelljs/global");
const log = require("./log");

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
