/* eslint-disable no-unused-vars */

const Socket = require('./socket');
const ConnectionPool = require('./pool/connection-pool');
const MessagePool = require('./pool/message-pool');
const UserPool = require('./pool/user-pool');

let socket = new Socket();

const clearIntervalHours = Number(process.env.CLEAR_INTERVAL || 24);
const clearIntervalMs = clearIntervalHours * 60 * 60 * 1000;

function clearServerMemory() {
  socket.close();
  ConnectionPool.getInstance().clear();
  MessagePool.getInstance().clear();
  UserPool.getInstance().clear();
  socket = new Socket();
}

if (clearIntervalMs) {
  setInterval(() => {
    clearServerMemory();
  }, clearIntervalMs);
}
