export default function createBox(group,x,y){

  var _box = group.create(x,y,'mystery_box');

  _box.body.immovable = true;
  //
  // function collide(player,this){
  //
  // }

  return {
    box : _box
  }

}
