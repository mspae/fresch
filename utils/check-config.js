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

  // iterate over the groups
  requiredOpts.map(configGroupName => {
    // iterate over the options
    configGroups[configGroupName].map(configName => {
      // if the option is undefined, append to the errorMessage
      if (config[configName] === undefined) {
        errorMessage += `\n• ${configName} missing!`;
      }
    });
  });

  // if there is an error, append one final explanation and exit
  if (errorMessage.length > 0) {
    errorMessage += "\n\nRequired config could not be inferred!";
    log(errorMessage, "error");
    process.exit(1);
  }

  // otherwise return the config
  return config;
};
