import Box from './mystery_box.js';
import Character from './character.js';
import 'pixi.js'
import 'p2';
import  Phaser from 'phaser';

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});
var boxes;
var character;
var cursors;

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
    boxes.enableBody = true;

    for (var i = 0; i < 8; i++) {
      var box = Box(boxes,{
                          x: i*90 + 20,
                          y: Math.floor((Math.random() * 400) + 1)
                        });
    }

    cursors = game.input.keyboard.createCursorKeys();

    character = Character(game).character;
}


function update(){

  game.physics.arcade.collide(character,boxes,hitBox);

  function hitBox(character,boxHitted){
    boxHitted.hit(character,Math.floor((Math.random() * 1000) + 1));
  }

  character.body.velocity.x = 0;

  if (cursors.left.isDown){
      character.body.velocity.x = -150;
      character.animations.play('left');
  }
  else if (cursors.right.isDown){
      character.body.velocity.x = 150;
      character.animations.play('right');
  }
  else{
      character.animations.stop();
      character.frame = 1;
  }

  if (cursors.up.isDown /*&& character.character.body.touching.down*/){
      character.body.velocity.y = -350;
  }

}
