    Refresh local dev environment with files and database from a remote server

Fresch is a command line tool which is basically a wrapper around `rsync` and `mysql` (and `mysqldump`). You can save global connection configuration and alias specific configuration and then quickly sync htdocs and databases by using the alias.

This is useful in cases where your local development environment is mirrored by an instance on a remote server and not all relevant data is stored in version control. Drip allows you to 1) quickly sync files from the remote 2) quickly sync a local database with the remote counterpart.

All settings are saved in a [json settings file](https://github.com/yeoman/configstore) in your config directory. (And could be thus also synced through, for example, Dropbox, by using a symlink)

Install it like this:

    npm install fresch -g

Showing help information:

    fresch help

Showing global configuration:

    fresch show

Fresch includes comprehensive documentation and help for all commands and parameters. Here is what you get when you run `fresch help`

