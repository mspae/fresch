const colors = require("colors/safe");
const table = require("console.table");

// @see http://stackoverflow.com/a/1359808/5097199
function sortObject(o) {
  var sorted = {}, key, a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

colors.setTheme({
  info: "blue",
  success: "green",
  help: "gray",
  warn: "yellow",
  debug: "yellow",
  error: "red"
});

module.exports = function(logThis, type, noMargin) {
  if (typeof logThis === "object") {
    if (Object.keys(logThis).length === 0) {
      return console.log(colors[type]("Nothing to show!\n"));
    }
    return console.table(sortObject(logThis));
  }
  const message = !type ? logThis : colors[type](logThis);
  const margin = noMargin ? "" : "\n";
  console.log(margin + message + margin);
};
