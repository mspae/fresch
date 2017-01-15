#!/usr/bin/env node
const program = require("commander");
const dateformat = require("dateformat");

const log = require("./utils/log");
const setOptions = require("./utils/set-options");
const getConfig = require("./utils/get-config");
const checkConfig = require("./utils/check-config");
const rsync = require("./utils/rsync");
const run = require("./utils/run");

const requiredOpts = [ "files", "remote", "op" ];

setOptions(program, requiredOpts);
program.parse(process.argv);
const alias = program.args[0];

const config = checkConfig(getConfig(program, alias), requiredOpts);

console.log();
// make dump
log("• Syncing htdocs directory to local ...", "info", true);
run(rsync(config, config.remotedir, config.localdir), config.simulate);
log("• Synced htdocs directory to local", "success", true);
