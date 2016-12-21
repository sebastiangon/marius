export default function createBox(group,coordinates){

  var _box = group.create(coordinates.x,coordinates.y,'mystery_box');

  _box.enableBody = true;
  _box.body.immovable = true;

  _box.points = Math.floor((Math.random() * 1000) + 1);

  _box.hit =  (player,newPoints) =>{
  _box.points = newPoints;
    console.log(_box.points);
  }

  //each box listens its own clic so it can change its points
  _box.inputEnabled = true;
  _box.events.onInputDown.add(function(){
    console.log(this.points);
    _box.points = Math.floor((Math.random() * 1000) + 1);
  },_box);


  return {
    box : _box
  }
};
