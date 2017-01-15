const Store = require("configstore");
const pkg = require("../package.json");

module.exports = function store() {
  let instance;

  if (!instance) {
    instance = new Store(pkg.name, {
      global: {
        localdbbin: "mysql",
        localdbhost: "localhost",
        remotedbbin: "mysql",
        remotedbhost: "localhost",
        exclude: "--exclude node_modules",
        remotedir: "/var/www/htdocs",
        localdir: "/var/www/htdocs",
        port: 22,
        snapshot: false
      },
      aliases: {}
    });
  }

  return instance;
};
