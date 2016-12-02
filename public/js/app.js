import Box from './mystery_box.js'

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});

function preload(){
  game.load.image('mystery_box','../assets/mystery_box.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    boxes = game.add.group();
    boxes.enableBody = true;
    var box_1 = Box(boxes,50,100);
    var box_2 = Box(boxes,200,100);

}

function update(){

}
