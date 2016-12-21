import Box from './mystery_box.js';
import Character from './character.js';
import 'pixi.js'
import 'p2';
import  Phaser from 'phaser';

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});
var boxes;
var character;

function preload(){
  game.load.image('background','../assets/background.png')
  game.load.image('mystery_box','../assets/mystery_box.png');

  game.load.spritesheet('skull','../assets/characters/skull.png',32,32);
  game.load.spritesheet('gargoile','../assets/characters/gargoile.png',32,32);
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'background');

    boxes = game.add.group();
    console.log(boxes);
    boxes.enableBody = true;

    for (var i = 0; i < 8; i++) {
      var box = Box(boxes,{
                          x: i*90 + 20,
                          y: Math.floor((Math.random() * 400) + 1)
                        });
    }

    character = Character(game);
}


function update(){
  //game.physics.arcade.collide(Player,boxes);
  game.physics.arcade.overlap(character,boxes,hitBox,null,this);

  function hitBox(character,boxHitted){
    boxHitted.hit(character,Math.floor((Math.random() * 1000) + 1));
    //Player.sumPoints(player,_box.points);
  }

}
