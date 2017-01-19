module.exports = {

  state : {
    maxPlayers : 8,
    character_sprites : ['death','gargoile','genie','red','shadow','skull','troll','viking'],
    players:[],
    boxes_coordinates : null
  },

  setState : (element,value)=>{
    module.exports.state[element] = value;
  }

}
