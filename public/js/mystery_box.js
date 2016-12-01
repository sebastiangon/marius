module.exports = {
  createBox:createBox
}

function createBox(group,x,y){

  var _box = group.create(x,y,'mystery_box');
  _box.body.immovable = true;
  _box.body.gravity.y = 50;
  _box.body.bounce.y = 0.8;
  _box.body.collideWorldBounds = true;
  return {
    box : _box
  }

}
