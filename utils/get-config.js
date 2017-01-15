const extend = require("extend");
const store = require("./store")();
const log = require("./log");

module.exports = function getConfig(program, alias, allowInvalidAliasConfig) {
  const globalConfig = store.get("global");
  let aliasConfig = {};

  // copy the parameters into a parameter object which we can use for extending
  let parameters = {};
  program.options.forEach(option => {
    const name = option.long.substr(2, option.long.length - 2);
    if (program[name] !== undefined && typeof program[name] !== "function") {
      parameters[name] = program[name];
    }
  });

  // true is actually an empty string in the case of passwords
  if (parameters.localdbpass && parameters.localdbpass === true) {
    parameters.localdbpass = "";
  }
  if (parameters.remotedbpass && parameters.remotedbpass === true) {
    parameters.remotedbpass = "";
  }

  // get the alias config if there was one defined
  if (alias) {
    if (!store.get(`aliases.${alias}`) && !allowInvalidAliasConfig) {
      log(`Alias ${alias} not found!`, "error");
      process.exit(1);
    } else {
      aliasConfig = store.get(`aliases.${alias}`);
    }
  }
  const config = extend({}, globalConfig, aliasConfig, parameters);

  // make sure only snapshot is set, not diff
  if (config.diff) {
    delete config.diff;
    config.snapshot = false;
  }

  return config;
};
