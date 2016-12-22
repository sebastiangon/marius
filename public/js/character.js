export default function character(game){

  var _character = game.add.sprite(32,game.world.height - 150,'skull');
  game.physics.arcade.enable(_character);

  _character.body.bounce.y = 0.3;
  _character.body.gravity.y = 300;
  _character.body.collideWorldBounds = true;


  _character.animations.add('left',[9,10,11] , 12, true);
  _character.animations.add('right',[3,4,5], 12, true);

  return {
    character : _character
  }
};
