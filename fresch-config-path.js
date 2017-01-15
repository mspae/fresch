#!/usr/bin/env node
const program = require("commander");

const log = require("./utils/log");
const getConfigPath = require("./utils/get-config-path");

program.parse(process.argv);
const alias = program.args[0];

log(getConfigPath(), "info");
