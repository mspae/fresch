#!/usr/bin/env node
const program = require("commander");
const log = require("./utils/log");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .description(
    "Refresh local dev environment with files and database from a remote installation"
  )
  .command("htdocs [alias]", "sync remote htdocs with the local one")
  .command("db [alias]", "sync remote database with the local one")
  .command("show [alias]", "show global config (or alias config)")
  .command("save [alias]", "save config globally (or under an alias)")
  .command("delete <alias>", "delete an alias")
  .command("config-path", "print the path to the config file");

program.on("--help", function() {
  log("  Examples:\n", false, true);
  log(
    "    (A tilde in the remotedir option should be escaped by enclosing it in quotes)",
    "help",
    true
  );
  log(
    '    $ fresch save myalias --port 10201 --localdir /var/www/local/mylocalroot \\\n    --remotedir "~/www/htdocs/"\n',
    false,
    true
  );

  log("    Save an empty mysql password surrounded by quotes:", "help", true);
  log('    $ fresch save myalias --remotedbpass ""\n', false, true);

  log("    Show the saved options for alias myalias:", "help", true);
  log("    $ fresch show myalias\n", false, true);

  log("    Use -S/--simulate to preview the command:", "help", true);
  log("    $ fresch htdocs myalias -S\n", false, true);

  log(
    "    fresch will tell you if you have missing config for a command:",
    "help",
    true
  );
  log("    $ fresch db myalias\n", false, true);

  log("    Open config file for debugging & manual adjustment:", "help", true);
  log("    $ vi $(fresch config-path)\n", false, true);
});

program.parse(process.argv);
