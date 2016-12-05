import Box from './mystery_box.js';

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});

function preload(){
  game.load.image('background','../assets/background.png')
  game.load.image('mystery_box','../assets/mystery_box.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0,'background');

    let boxes = game.add.group();
    boxes.enableBody = true;
    let box_1 = Box(boxes,50,100);
    let box_2 = Box(boxes,200,100);
}

function update(){

}
