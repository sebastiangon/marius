export default function createBox(group,x,y){

  var _box = group.create(x,y,'mystery_box');
  _box.body.immovable = true;
  _box.body.gravity.y = 75;
  _box.body.bounce.y = x*0.1;
  _box.body.collideWorldBounds = true;
  return {
    box : _box
  }

}
