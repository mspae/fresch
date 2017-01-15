    Update local dev environment with files and database from a remote server

Fresch is a command line tool which basically wraps around `rsync` and `mysql` (and `mysqldump`). You can save global connection configuration and alias specific configuration and then quickly sync htdocs and databases by using the alias.

This is useful in cases where your local development environment is mirrored by an instance on a remote server and not all relevant data is stored in version control. Fresch allows you to 1) quickly sync files from the remote 2) quickly import locally a dump of the remote database.

All settings are saved in a [json settings file](https://github.com/yeoman/configstore) in your config directory. (And could therefore also by synced easily through, for example, Dropbox, by using a symlink)

## Basics

Install it like this:

    npm install fresch -g

Showing help information:

    fresch help

Showing global configuration:

    fresch show

## Requirements

(Fresch should just work out of the box with most Unix-like systems)

* `rsync` (A version which supports `--info=progress2`)
* `gzip`
* `ssh` (needs to be properly configured (= no passwords or keys need to be explicitly passed for it to work))
* `mysql` (A custom binary can be configured)
* On the remote server: `mysqldump` and `gzip`
* `/tmp` is the temporary directory and can be written to

## Documentation

Fresch includes comprehensive documentation and help for all commands and parameters. Here is what you get when you run `fresch help` (Note: To see the documentation of each command, run `fresch help command-name`)

    Usage: fresch [options] [command]
  
    Commands:
  
      htdocs [alias]  sync remote htdocs with the local one
      db [alias]      sync remote database with the local one
      show [alias]    show global config (or alias config)
      save [alias]    save config globally (or under an alias)
      delete <alias>  delete an alias
      config-path     print the path to the config file
      help [cmd]      display help for [cmd]
  
    Refresh local dev environment with files and database from a remote installation
  
    Options:
  
      -h, --help     output usage information
      -V, --version  output the version number
  
    Examples:
  
      (A tilde in the remotedir option should be escaped by enclosing it in quotes)
      $ fresch save myalias --port 10201 --localdir /var/www/local/mylocalroot \
      --remotedir "~/www/htdocs/"
  
      Save an empty mysql password surrounded by quotes:
      $ fresch save myalias --remotedbpass ""
  
      Show the saved options for alias myalias:
      $ fresch show myalias
  
      Use -S/--simulate to preview the command:
      $ fresch htdocs myalias -S
  
      fresch will tell you if you have missing config for a command:
      $ fresch db myalias
  
      Open config file for debugging & manual adjustment:
      $ vi $(fresch config-path)
