/**
 * Connect with SSH to the remote server
 */
module.exports = function ssh(config, command) {
  return `ssh -p ${config.port} ${config.remoteuser}@${config.remotehost} '${command}'`;
};
