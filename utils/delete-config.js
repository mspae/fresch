const store = require("./store");
const log = require("./log");

module.exports = function deleteConfig(alias) {
  const adress = `aliases.${alias}`;

  if (!store.get(adress)) {
    log(`Alias ${alias} not found!`, "error");
    process.exit(1);
  }
  store.delete(adress);

  log(`Deleted alias ${alias}!`, "success");
};
