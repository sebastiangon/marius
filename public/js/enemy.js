export default function enemy(game,sprite,name){

  var _enemy = game.add.sprite(32,game.world.height - 150,sprite);

   _enemy.world.x = 0;
   _enemy.world.y = 0;
   _enemy.frame = 0;

   _enemy.labelName = game.add.text(    _enemy.x,
                                        _enemy.y + 50,
                                        name,
                                        { font: "10px Arial",
                                          fontWeight : "900",
                                          fill: "#FFFFFF",
                                          wordWrap: true,
                                          wordWrapWidth: _enemy.width + 25,
                                          align: "center",
                                        });


  _enemy.setLabelPosition = function(){
    _enemy.labelName.x = _enemy.x;
    _enemy.labelName.y = _enemy.y - 20;
  }

  _enemy.updatePosition = function(x,y,frame){
    _enemy.x = x;
    _enemy.y = y;
    _enemy.frame = frame;
    _enemy.setLabelPosition();
  }

  return {
    enemy : _enemy
  }

};
