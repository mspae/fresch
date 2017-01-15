/**
 * Returns the ssh command as a string with a command to run on the remote
 */
module.exports = function ssh(config, command) {
  return `ssh -p ${config.port} ${config.remoteuser}@${config.remotehost} '${command}'`;
};
