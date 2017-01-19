import Box from './mystery_box.js';
import Character from './character.js';
import Enemy from './enemy.js';
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
var _boxes_coordinates;
var enemies = [];

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
    socket.on('onPlayerConnected',function(players){
      console.log('players joined');
      //Add to enemies everyone but me
      enemies = players.filter(function(player,i,array){
          return player.name != _name;
      });

      //If the enemy is new, we define him a spritesheet
      enemies.forEach((enemy,i)=>{
          if(enemy.spritesheet == null){
            enemy.spritesheet = Enemy(game,enemy.character_sprite,enemy.name).enemy;
            console.log('enemy ',enemy);
          }
      });
    });

    socket.on('onPlayerDisconected',function(players){
      console.log('players left');
      //Add to enemies everyone but me
      enemies = players.filter(function(player,i,array){
          return player.name != _name;
      });
      console.log(enemies);

    });

    socket.on('selfInfoAssigned',function(msg){
      console.log('selfInfoAssigned',msg);
      _sprite = msg.new_player.character_sprite;
      _name = msg.new_player.name;
      _boxes_coordinates = msg.boxes_coordinates;
      character = Character(game,_sprite,_name).character;

      boxes = game.add.group();
      boxes.enableBody = true;

      for (var i = 0; i < 8; i++) {
        Box(boxes,_boxes_coordinates[i],Math.floor((Math.random() * 1000) + 1));
      }


    });

    socket.on('receiveEnemyPosition',function(playerInfo){
        enemies.forEach((enemy,i)=>{
          if(enemy.name == playerInfo.player_name && enemy.spritesheet != null){
            enemy.spritesheet.updatePosition(playerInfo.x,playerInfo.y,playerInfo.frame);
            console.log('enemy position updated',enemy);
          }
        });
    });



    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'background');
    cursors = game.input.keyboard.createCursorKeys();

}


function update(){
  if(character != null){


    enemies.forEach((enemy,i)=>{
    });

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
        socket.emit('emitPosition',{
          x: character.world.x,y: character.world.y,frame: character.frame,player_name : _name,player_sprite: _sprite,
        });
    }
    else if (cursors.right.isDown){
        character.moveRight();
        socket.emit('emitPosition',{
          x: character.world.x,y: character.world.y,frame: character.frame,player_name : _name,player_sprite: _sprite,
        });
    }
    else{
        character.dontMove();
    }

    if (cursors.up.isDown && (character.body.blocked.down || standingOnBox)){
        character.moveUp();
        socket.emit('emitPosition',{
          x: character.world.x,y: character.world.y,frame: character.frame,player_name : _name,player_sprite: _sprite,
        });
    }

    //If im not standing on floor or on a box, then im falling or jumping, so i have to tell everybody im moving
    if(!(character.body.blocked.down || standingOnBox)){
      socket.emit('emitPosition',{
        x: character.world.x,y: character.world.y,frame: character.frame,player_name : _name,player_sprite: _sprite,
      });
    }
  }
}
