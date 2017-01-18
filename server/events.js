var state = require('./state.js');


module.exports = {

  onConnection : (socket,socketListener)=>{
    console.log('user connected');

    let new_player = {};
    new_player['name']='player ' + (state.state.players.length + 1);
    new_player['socketId']= socket.id;
    new_player['character_sprite']= state.state.character_sprites[state.state.players.length];

    let players = state.state.players;
    if(players.length + 1 < state.state.maxPlayers){
      players.push(new_player);
      state.setState('players',players);
      //Tells everybody someone joined
      socket.broadcast.emit('onPlayersUpdated',state.state.players);
      //Retrieve de joining players his own info
      if (socketListener.sockets.connected[socket.id]){
        socketListener.sockets.connected[socket.id].emit('selfInfoAssigned',new_player);
      }
    }
  },

  onDisconnection : (socket,socketListener)=>{
    socket.on('disconnect', function(){
      console.log('user disconnected');
      let players = state.state.players;
      let updatedPlayers = players.filter((item,i,array)=>{
        return item.socketId != socket.id;
      });
      state.setState('players',updatedPlayers);
      socketListener.emit('onPlayersUpdated',state.state.players);
    });
  },

  hitBox: (socket,socketListener)=>{
      socket.on('hitbox', () => {
      setTimeout(function(){
        socketListener.emit('fromServer','hi from server');
      },1000);
    });
  },
}
