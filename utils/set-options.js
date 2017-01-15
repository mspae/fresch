/**
* receives a program and applies all options
*/
function splitExcludeDirs(str) {
  return str.split(",").map(str => {
    return `--exclude ${str.trim()}`;
  }).join(" ");
}

function coerceBool(str) {
  if (str === "false") {
    return false;
  }
  return true;
}

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
          .option("-l, --localdbhost <host>", "host of the local mysql server")
          .option("-d, --localdb <dbname>", "name of the local database")
          .option("-u, --localdbuser <user>", "user for the local mysql DB")
          .option("-p, --localdbpass [pw]", "password for the local mysql DB")
          .option(
            "-E, --remotedbhost <host>",
            "host of the remote mysql server"
          )
          .option("-m, --remotedb <dbname>", "name of the remote database")
          .option("-o, --remotedbuser <user>", "user for the remote mysql DB")
          .option(
            "-t, --remotedbpass [pw]",
            "password for the remote mysql DB"
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
            "root directory of the Drupal installation on the remote host"
          )
          .option(
            "-L, --localdir <dir>",
            "root directory of the Drupal installation on the local host"
          );
        break;

      case "save-config":
        program
          .option(
            "-s, --snapshot",
            "save a complete snapshot of current config in alias"
          )
          .option(
            "-D, --diff",
            "save only the diff from the global config in alias config (opposite of --snapshot)"
          );
        break;

      case "remote":
        program
          .option("-P, --port <port>", "port for ssh connection", parseInt)
          .option("-U, --remoteuser <user>", "username/server environment")
          .option("-R, --remotehost <host>", "remote host");
        break;

      default:
    }
  });
  return program;
};
