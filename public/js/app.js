import Box from './mystery_box.js';
import Character from './character.js';
import Socket from './socket.js';
import 'pixi.js'
import 'p2';
import  Phaser from 'phaser';

var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload, create:create, update:update});
var boxes;
var character = null;
var cursors;
var socket;
var _sprite;
var _name;

function preload(){
  game.load.image('background','../assets/background.png')
  game.load.image('mystery_box','../assets/mystery_box.png');
  //characters
  game.load.spritesheet('death','../assets/characters/death.png',32,32);
  game.load.spritesheet('gargoile','../assets/characters/gargoile.png',32,32);
  game.load.spritesheet('genie','../assets/characters/genie.png',32,32);
  game.load.spritesheet('red','../assets/characters/red.png',32,32);
  game.load.spritesheet('shadow','../assets/characters/shadow.png',32,32);
  game.load.spritesheet('skull','../assets/characters/skull.png',32,32);
  game.load.spritesheet('troll','../assets/characters/troll.png',32,32);
  game.load.spritesheet('viking','../assets/characters/viking.png',32,32);
}

function create(){

    socket = Socket().socket;
    socket.on('onPlayersUpdated',function(msg){
      console.log('players updated');
      console.log(msg);
    });

    socket.on('selfInfoAssigned',function(msg){
      console.log('selfInfoAssigned');
      _sprite = msg.character_sprite;
      _name = msg.name;
      character = Character(game,_sprite,_name).character;
    });



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
}


function update(){
  if(character != null){
    var standingOnBox = false;
    game.physics.arcade.collide(character,boxes,hitBox);

    function hitBox(character,boxHitted){
      if(boxHitted.body.touching.down)
      {
        socket.emit('hitbox');
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
}
