const log = require("./log");

module.exports = function checkConfig(config, requiredOpts = []) {
  // configuration is split into option groups for checking
  const configGroups = {
    op: [],
    remote: [ "port", "remoteuser", "remotehost" ],
    files: [ "exclude", "remotedir", "localdir" ],
    db: [
      "localdbhost",
      "localdb",
      "localdbuser",
      "localdbpass",
      "remotedbhost",
      "remotedb",
      "remotedbuser",
      "remotedbpass"
    ]
  };
  let errorMessage = "";

  requiredOpts.map(configGroupName => {
    configGroups[configGroupName].map(configName => {
      if (config[configName] === undefined) {
        errorMessage += `\n• ${configName} config missing!`;
      }
    });
  });
  if (errorMessage.length > 0) {
    errorMessage += "\n\nRequired config could not be inferred!";
    log(errorMessage, "error");
    process.exit(1);
  }
  return config;
};
