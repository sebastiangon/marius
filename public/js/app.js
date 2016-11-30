var Box = require('./mystery_box');

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});

function preload(){
}

function create(){
  var b1 = Box.box(1);
  b1.sayId();
}

function update(){

}
