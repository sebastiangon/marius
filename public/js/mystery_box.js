//import Player from '../js/player.js';

export default function createBox(group,x,y){

  var _box = group.create(x,y,'mystery_box');

  _box.enableBody = true;
  _box.body.immovable = true;

  _box.points = Math.floor((Math.random() * 1000) + 1);

  return {
    box : _box
  }

};
