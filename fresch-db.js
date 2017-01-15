#!/usr/bin/env node
const program = require("commander");
const dateformat = require("dateformat");

const log = require("./utils/log");
const setOptions = require("./utils/set-options");
const getConfig = require("./utils/get-config");
const checkConfig = require("./utils/check-config");
const rsync = require("./utils/rsync");
const ssh = require("./utils/ssh");
const run = require("./utils/run");

const requiredOpts = [ "db", "remote", "op" ];
const timestamp = dateformat(new Date(), "yyyymd_HM");
const dumpLocation = `/tmp/local_sync_${timestamp}.sql.gz`;

setOptions(program, requiredOpts);
program.parse(process.argv);
const alias = program.args[0];

const config = checkConfig(getConfig(program, alias), requiredOpts);

console.log();
// make dump
log("• Making database dump on remote ...", "info", true);
run(
  ssh(
    config,
    `mysqldump -h ${config.remotedbhost} -u ${config.remotedbuser} --password="${config.remotedbpass}" ${config.remotedb} | gzip > ${dumpLocation}`
  ),
  config.simulate
);
log("• Made database dump on remote", "success", true);

// sync dump
log("• Syncing database dump to local temp directory ...", "info", true);
run(rsync(config, dumpLocation, dumpLocation), config.simulate);
log("• Synced dump to local temp directory", "success", true);

// import dump
log("• Importing dump to local mysql ...", "info", true);
run(
  `pv ${dumpLocation} | gunzip | pv | ${config.localdbbin} -h ${config.localdbhost} -u ${config.localdbuser} --password="${config.localdbpass}" ${config.localdb}`,
  config.simulate
);
log("• Imported dump to local mysql", "success", true);
