const store = require("./store");

module.exports = function getConfigPath() {
  return store.path;
};
