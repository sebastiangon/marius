const io = require('socket.io');
const events = require('./events.js');


module.exports = {
  setup: function(server) {
    const socketListener = io(server);

    socketListener.on('connection', (socket) => {
      events.onConnection(socket,socketListener);
      events.onDisconnection(socket,socketListener);
      events.onEmitPosition(socket,socketListener);
      events.hitBox(socket,socketListener);
    });
  }
}
