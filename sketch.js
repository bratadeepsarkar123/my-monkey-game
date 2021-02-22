var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey ,v, monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var  obstacleGroup,restart,restart_img
var score,ground,bananaGroup

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400,400); 
score=0;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running); 
  monkey.scale=0.1;

  v=createSprite(200,200,100,100);
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  invisibleGround = createSprite(400,351,900,10);
  invisibleGround.visible = false;
 
bananaGroup = createGroup(); 
   obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height+50);
  monkey.debug = true
 
}


function draw() {
 background("lightBlue");
 fill("black");
  stroke("black")
  textSize(20)
   text("SURVIVAL TIME : "+ score, 120,50);
 
 
  
  if(ground.x<0){
     ground.x = ground.width/2;
    
     }
  if(gameState===PLAY){
    v.visible=false;
if(keyWentDown("space")&& monkey.y<250 && monkey.y>180||(keyDown("space")&& monkey.isTouching(ground)) ){
        monkey.velocityY = -12;
  }
monkey.velocityY = monkey.velocityY +0.8;  
 
if(bananaGroup.isTouching(monkey)){
  bananaGroup.destroyEach();
}
     score = Math.round(frameCount/frameRate());
  
   ground.debug=true 
  
  monkey.collide(invisibleGround)
  
  drawSprites();
  spawnbananas();
  spawnObs();
  console.log(ground.x)
     if(obstacleGroup.isTouching(monkey)){
      gameState=END; 
     }
}else if (gameState === END) {
 
      ground.velocityX = 0;
      monkey.velocityY = 0
      
text("click at the centre of the canvas to continue",10,200)     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    v.visible=true ;
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
 
  if(mousePressedOver(v)) {
      reset();
    }

   }
  
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 400/3;
     banana.debug=true 
  
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

function spawnObs() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,328,40,10);
  
    obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -3;
    
     //assign lifetime to the variable
   obstacle.lifetime = 400/3;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    //add each cloud to the group
   obstacleGroup.add(obstacle);
  }
}

function reset(){
 //yes
  gameState=PLAY;
ground.velocityX=-4;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
v.visible=false;
  
  score=0;
}


