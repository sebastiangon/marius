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

  //characters
  game.load.spritesheet('death','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('gargoile','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('genie','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('red','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('shadow','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('skull','../assets/characters/skull.png',32,32);
  game.load.spritesheet('troll','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('viking','../assets/characters/gargoile.png',32,32);
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'background');

    boxes = game.add.group();
    boxes.enableBody = true;

    for (var i = 0; i < 8; i++) {
      var box = Box(boxes,
                    {
                          x: i*90 + 20,
                          y: Math.floor((Math.random() * 400) + 1)
                    },
                    Math.floor((Math.random() * 1000) + 1)
                    );
    }

    cursors = game.input.keyboard.createCursorKeys();

    character = Character(game,"skull","Seba").character;
}


function update(){

  var standingOnBox = false;
  game.physics.arcade.collide(character,boxes,hitBox);

  function hitBox(character,boxHitted){
    if(boxHitted.body.touching.down)
    {
      character.sumPoints(boxHitted.points);
      boxHitted.changePoints(Math.floor((Math.random() * 1000) + 1));
    }else if(boxHitted.body.touching.up)
    {
      standingOnBox = true;
    }
  }

  character.body.velocity.x = 0;
  character.setLabelPosition();

  if (cursors.left.isDown){
      character.moveLeft();
  }
  else if (cursors.right.isDown){
      character.moveRight();
  }
  else{
      character.dontMove();
  }

  if (cursors.up.isDown && (character.body.blocked.down || standingOnBox)){
      character.moveUp();
  }

}
