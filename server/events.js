var state = require('./state.js');


module.exports = {

  onConnection : (socket,socketListener)=>{
    console.log('user connected');

    let new_player = {};
    let boxes_coordinates = [];

    new_player['name']='player ' + (state.state.players.length + 1);
    new_player['socketId']= socket.id;
    new_player['character_sprite']= state.state.character_sprites[state.state.players.length];
    new_player['spritesheet'] = null;

    if(state.state.boxes_coordinates == null){
      for (var i = 0; i < 8; i++) {
        let x = i*90 + 20;
        let y = Math.floor((Math.random() * 400) + 1);
        boxes_coordinates.push({x,y});
      }
      state.setState('boxes_coordinates',boxes_coordinates);
    }

    let players = state.state.players;
    if(players.length + 1 < state.state.maxPlayers){
      players.push(new_player);
      state.setState('players',players);

      //Retrieve de joining players his own info and the other players info
      if (socketListener.sockets.connected[socket.id]){
        socketListener.sockets.connected[socket.id].emit('selfInfoAssigned',{
                                                                              'new_player':new_player,
                                                                              'boxes_coordinates':state.state.boxes_coordinates
                                                                            });
      }

      //Tells everybody someone joined
      socketListener.emit('onPlayerConnected',state.state.players);
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
      socketListener.emit('onPlayerDisconnected',state.state.players);
    });
  },

  onEmitPosition : (socket,socketListener)=>{
    socket.on('emitPosition',function(msg){
      console.log('server received position: ',msg);
      socket.broadcast.emit('receiveEnemyPosition',msg);
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
