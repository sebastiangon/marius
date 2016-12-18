import Box from './mystery_box.js';
var Player;//import Player from './player.js';

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});
var boxes;

function preload(){
  game.load.image('background','../assets/background.png')
  game.load.image('mystery_box','../assets/mystery_box.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'background');

    boxes = game.add.group();
    boxes.enableBody = true;

    for (var i = 0; i < 8; i++) {
      var box = Box(boxes,i*90 + 20,Math.floor(Math.random() * 400) + 1);
    }
}


function update(){

}
