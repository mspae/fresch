const diff = require("object-diff");
const extend = require("extend");
const store = require("./store");
const log = require("./log");

function message(alias, diff) {
  if (!alias) {
    return "Saved global config:";
  } else {
    if (diff) {
      return `Saved override config for alias ${alias}: (Do "fresch show ${alias}" to see complete config)`;
    } else {
      return `Saved complete config of alias ${alias}:`;
    }
  }
}

/**
 * Save configuration to global config or to an alias config, either as a diff
 * of the global config, or as a complete snapshot (if complete is truethy and
 * alias is set)
 */
module.exports = function saveConfig(config, complete, alias) {
  const globalConfig = store.get("global");
  const adress = alias ? `aliases.${alias}` : "global";
  const oldConfig = store.get(adress);
  // compute config from previous config and new parameters
  let newConfig = extend({}, oldConfig, config);

  // is alias and complete is not set, compute the diff
  if (alias && !snapshot) {
    newConfig = diff(globalConfig, newConfig);
  }

  // don't save the simulate flag
  if (newConfig.simulate) {
    delete newConfig.simulate;
  }

  store.set(adress, newConfig);

  log(message(alias, !snapshot), "success");
  log(newConfig, "info");
};
