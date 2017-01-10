const io = require('socket.io');

module.exports = {
  setup: function(server) {
    const socketListener = io(server);

    socketListener.on('connection', (socket) => {
      console.log('this sockete have connected:', socket.id);
      socket.on('goku', () => {
        console.log('Ping from client');
        socketListener.emit('add');
      });
    });
  }
}
