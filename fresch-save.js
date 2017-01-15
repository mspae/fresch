#!/usr/bin/env node
const program = require("commander");

const setOptions = require("./utils/set-options");
const getConfig = require("./utils/get-config");
const saveConfig = require("./utils/save-config");
const log = require("./utils/log");

setOptions(program, [ "db", "files", "remote", "save-config" ]);
program.parse(process.argv);
const alias = program.args[0];

const config = getConfig(program, alias, true);

saveConfig(config, config.snapshot, alias);
