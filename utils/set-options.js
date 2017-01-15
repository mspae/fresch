function splitExcludeDirs(str) {
  return str.split(",").map(str => {
    return `--exclude ${str.trim()}`;
  }).join(" ");
}

/**
* receives a program and applies all options, opts is an array of option groups
* (also used in check-config.js) to determine what options to allow/require
*/
module.exports = function setOptions(program, opts = []) {
  opts.forEach(groupName => {
    switch (groupName) {
      case "op":
        program.option(
          "-S, --simulate",
          "don't run commands, just print them out"
        );
        break;

      case "db":
        program
          .option(
            "-d, --localdbbin <bin>",
            "adress of the local mysql executable"
          )
          .option(
            "-l, --localdbhost <host>",
            "host of the local database server"
          )
          .option("-d, --localdb <dbname>", "name of the local database")
          .option("-u, --localdbuser <user>", "user for the local database")
          .option("-p, --localdbpass [pw]", "password for the local database")
          .option(
            "-E, --remotedbhost <host>",
            "host of the remote database server"
          )
          .option("-m, --remotedb <dbname>", "name of the remote database")
          .option("-o, --remotedbuser <user>", "user for the remote database")
          .option(
            "-t, --remotedbpass [pw]",
            "password for the remote database"
          );
        break;

      case "files":
        program
          .option(
            "-e, --exclude <dir,dir,...>",
            "directories that should be excluded from syncing",
            splitExcludeDirs
          )
          .option(
            "-r, --remotedir <dir>",
            "directory to sync from on the remote host"
          )
          .option(
            "-L, --localdir <dir>",
            "directory to  sync to on the local host"
          );
        break;

      case "save-config":
        program
          .option(
            "-C, --complete",
            "save a complete snapshot of config (opposite of --diff)"
          )
          .option(
            "-D, --diff",
            "save only the overwritten config (opposite of --complete)"
          );
        break;

      case "remote":
        program
          .option("-P, --port <port>", "port for ssh connection", parseInt)
          .option("-U, --remoteuser <user>", "user on the remote host")
          .option("-R, --remotehost <host>", "remote host");
        break;

      default:
    }
  });
  return program;
};
