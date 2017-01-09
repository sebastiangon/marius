export default function createBox(group,coordinates,initialPoints){

  var _box = group.create(coordinates.x,coordinates.y,'mystery_box');

  _box.enableBody = true;
  _box.body.immovable = true;
  _box.points = initialPoints;

  _box.changePoints = (newPoints) =>{
    if(_box.body.touching.down)
    {
      _box.points = newPoints;
    }
  }

  return {
    box : _box
  }
};
