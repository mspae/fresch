#!/usr/bin/env node
const program = require("commander");

const log = require("./utils/log");
const deleteConfig = require("./utils/delete-config");

program.parse(process.argv);
const alias = program.args[0];

if (!alias) {
  log("Please specify an alias to delete!", "error");
  process.exit(1);
}

deleteConfig(alias);
