/**
 * Returns the rsync command as a string
 */
module.exports = function rsync(config, remoteTarget, localTarget) {
  return `rsync --info=progress2 -aze "ssh -p ${config.port}" ${config.remoteuser}@${config.remotehost}:${remoteTarget} ${localTarget} ${config.exclude}`;
};
