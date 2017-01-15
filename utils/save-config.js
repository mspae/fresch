const diff = require("object-diff");
const extend = require("extend");
const store = require("./store")();
const log = require("./log");

function message(alias, diff) {
  if (!alias) {
    return "Saved global config:";
  } else {
    if (diff) {
      return `Saved override config for alias ${alias}: (Do "fresch show ${alias}" to see current config)`;
    } else {
      return `Saved snapshot of config for alias ${alias}:`;
    }
  }
}

module.exports = function saveConfig(config, snapshot, alias) {
  const globalConfig = store.get("global");
  const adress = alias ? `aliases.${alias}` : "global";
  const oldConfig = store.get(adress);
  let newConfig = extend({}, oldConfig, config);

  if (alias && !snapshot) {
    newConfig = diff(globalConfig, newConfig);
  }

  if (newConfig.simulate) {
    delete newConfig.simulate;
  }

  store.set(adress, newConfig);

  log(message(alias, !snapshot), "success");
  log(newConfig, "info");
};
