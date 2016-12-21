export default function character(game){

  var _player = game.add.sprite(32,game.world.height - 150,'skull');
  game.physics.arcade.enable(_player);

  _player.body.bounce.y = 0.2;
  _player.body.gravity.y = 300;
  _player.body.collideWorldBounds = true;


  _player.animations.add('left', [0, 1, 2], 10, true);
  _player.animations.add('right', [4, 5, 6], 10, true);

  return {
    character : _player
  }
};
