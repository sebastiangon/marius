var Box = require('./mystery_box');

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});

function preload(){
  game.load.image('mystery_box','../assets/mystery_box.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);


    boxes = game.add.group();
    boxes.enableBody = true;
    var box_1 = Box.createBox(boxes,50,100);

}

function update(){

}
