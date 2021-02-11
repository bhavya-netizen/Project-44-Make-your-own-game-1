var car1, car1Image;
var car2, car2Image;
var car3, car3Image;
var car4, car4Image;
var car1Group, car2Group, car3Group, car4Group;
var road, roadImage;
var player, playerImage;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameoverImage;
var restart, restartImage;

function preload(){
  playerImage = loadImage("bike.png");
  roadImage = loadImage("track.jpg");
  car1Image = loadImage("car1.png");
  car2Image = loadImage("car2.png");
  car3Image = loadImage("car3.png");
  car4Image = loadImage("car4.png");
  gameoverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
}

function setup(){
  createCanvas(550, 600);

  road = createSprite(285, 300, 550, 600);
  road.addImage(roadImage);
  road.velocityY = 10;
  road.y = road.height/2;

  player = createSprite(270, 550, 30, 30);
  player.addImage(playerImage);
  player.scale = 0.3;
  
  gameover = createSprite(270 ,350, 30, 30);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.175;
  
  restart = createSprite(270, 430, 30, 30);
  restart.addImage(restartImage);
  restart.scale = 0.8;
  
  car1Group = new Group();
  car2Group = new Group();
  car3Group = new Group();
  car4Group = new Group();

  score = 0;
  
}

function draw(){
  background("pink");

  if(gameState === PLAY){
    
    road.velocityY = -10;

    score = score + Math.round(getFrameRate()/30);

    if(road.y <= 100){
      road.y = road.height/2;
    }

    if(keyDown("RIGHT_ARROW")){
      player.x = player.x + 8;
    }
    
    if(keyDown("LEFT_ARROW")){
      player.x = player.x - 8;
    }

    spawncar1();
    spawncar2();
    spawncar3();
    spawncar4();

    if(car1Group.isTouching(car2Group)){
      car2Group.destroyEach();
    }
    if(car1Group.isTouching(car3Group)){
      car3Group.destroyEach();
    }
    if(car1Group.isTouching(car4Group)){
      car4Group.destroyEach();
    }
     if(car2Group.isTouching(car3Group)){
      car3Group.destroyEach();
    }
     if(car2Group.isTouching(car4Group)){
      car4Group.destroyEach();
    }
    if(car3Group.isTouching(car4Group)){
      car4Group.destroyEach();
    }

      if(player.isTouching(car1Group) || player.isTouching(car2Group)||
        player.isTouching(car3Group) || player.isTouching(car4Group)){
        gameState = END;
      }
      
      
    gameover.visible = false;
    restart.visible = false;

  }else if(gameState === END){
        road.velocityY = 0;
        car1Group.destroyEach();
        car2Group.destroyEach();
        car3Group.destroyEach();
        car4Group.destroyEach();
        player.visible = false;
        gameover.visible = true;
        restart.visible = true;
      
      if(mousePressedOver(restart)) {
        reset();
      }
  
    }

    drawSprites();
    
    fill("black");
    textSize(20);
    text("Score : "+ score, 400, 50);
    
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  player.visible = true;
  score = 0;
}

function spawncar1(){
  
  if(frameCount%250 === 0){
    var car1 = createSprite(100, -100, 30, 30);
    car1.addImage(car1Image);
    car1.scale = 1.5;
    car1.velocityY = 4;
    car1.x = Math.round(random(40, 300));
    car1.lifetime = 300;
    car1Group.add(car1);
  }
}

function spawncar2(){
  
  if(frameCount%170 === 0){
    var car2 = createSprite(100, -100, 30, 30);
    car2.addImage(car2Image);
    car2.scale = 1.5;
    car2.velocityY = 5;
    car2.x = Math.round(random(250, 500));
    car2.lifetime = 300;
    car2Group.add(car2);
  }
}


function spawncar3(){
  
  if(frameCount%350===0){
    var car3 = createSprite(100, -100, 30, 30);
    car3.addImage(car3Image);
    car3.scale = 1.5;
    car3.velocityY = 4;
    car3.x = Math.round(random(40,330));
    car3.lifetime = 300;
    car3Group.add(car3);
  }
}


function spawncar4(){
  if(frameCount%600 === 0){
    var car4 = createSprite(100, -100, 30, 30);
    car4.addImage(car4Image);
    car4.scale = 1.5;
    car4.velocityY = 5;
    car4.x = Math.round(random(50, 500));
    car4.lifetime = 300;
    car4Group.add(car4);
  }
}