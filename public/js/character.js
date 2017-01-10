export default function character(game,avatar,name){

  var _character = game.add.sprite(32,game.world.height - 150,avatar);
  game.physics.arcade.enable(_character);
  _character.avatar = avatar;
  _character.name = name;
  _character.score = 0;
  _character.body.bounce.y = 0.3;
  _character.body.gravity.y = 300;
  _character.body.collideWorldBounds = true;
  _character.animations.add('left',[9,10,11] , 12, true);
  _character.animations.add('right',[3,4,5], 12, true);

   _character.labelName = game.add.text(_character.world.x,
                                        _character.world.y + 50,
                                        name,
                                        { font: "10px Arial",
                                          fontWeight : "900",
                                          fill: "#FFFFFF",
                                          wordWrap: true,
                                          wordWrapWidth: _character.width,
                                          align: "center",
                                        });

  _character.moveUp = function(){
    _character.body.velocity.y = -450;
  }
  _character.moveLeft = function(){
    _character.body.velocity.x = -150;
    _character.animations.play('left');
  }
  _character.moveRight = function(){
    _character.body.velocity.x = 150;
    _character.animations.play('right');
  }
  _character.dontMove = function(){
    _character.body.velocity.x = 0;
    _character.frame = 1;
  }
  _character.sumPoints = function(points){
    _character.score += points;
    console.log("Total Points: ",_character.score);
  }

  _character.setLabelPosition = function(){
    _character.labelName.x = _character.world.x;
    _character.labelName.y = _character.world.y - 20;
  }

  return {
    character : _character
  }
};
