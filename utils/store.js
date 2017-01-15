const Store = require("configstore");
const pkg = require("../package.json");

/**
 * Returns the store singleton for the configuration
 */
module.exports = new Store(pkg.name, {
  global: {
    localdbbin: "mysql",
    localdbhost: "localhost",
    remotedbbin: "mysql",
    remotedbhost: "localhost",
    exclude: "--exclude node_modules",
    remotedir: "/var/www/htdocs",
    port: 22,
    complete: false
  },
  aliases: {}
});
