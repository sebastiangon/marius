module.exports = {

  state : {
    maxPlayers : 8,
    character_sprites : ['death','gargoile','genie','red','shadow','skull','troll','viking'],
    players:[],
  },

  setState : (element,value)=>{
    module.exports.state[element] = value;
  }

}
