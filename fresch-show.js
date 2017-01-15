#!/usr/bin/env node
const program = require("commander");

const setOptions = require("./utils/set-options");
const getConfig = require("./utils/get-config");
const log = require("./utils/log");

setOptions(program, [ "db", "files", "remote", "op" ]);

program.parse(process.argv);
const alias = program.args[0];
const config = getConfig(program, alias);
let message;

if (alias) {
  message = `Config for alias ${alias}:`;
} else {
  message = "Global config:";
}

log(message, "info");
log(config, "info");
