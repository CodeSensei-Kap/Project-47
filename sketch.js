var bg1, startBG, bg2;
var ninja, sensei, boxer, wizard, sensei2, tentacular, djimmi, toad, boss;
var start; //add images in this cntext here!
var startImg; //add images in this context here!
var ninjaImg, senseiImg, boxerImg, wizardImg, sensei2Img, tentacularImg, 
djimmiImg, toadImg, bossImg;
var edges;
var gameState = 0;
var board,boardImg;
var kunaiknife,kunaiknifeImg, kunaiKnifeGroup, punch, boxerPunchImg;
var s1, s1Img, s2, s2Img, s3, s3Img, s4, s4Img;
var score = 0;
var flag=1;
var punchGroup;

function preload() {
  startBG = loadImage("assets/StartBG.webp");
  bg1 = loadImage("assets/Level1_DojoBG.webp");
  bg2 = loadImage("assets/boxingArena.jpg");

  ninjaImg = loadImage("assets/character.png");
  senseiImg = loadImage("assets/Sensei.png");
  boxerImg = loadImage("assets/Boxer.png");
  wizardImg = loadImage("assets/wizard.PNG");
  sensei2Img = loadImage("assets/sensei_boss 2.png");
  tentacularImg = loadImage("assets/tentacular_boss2.png");
  djimmiImg = loadImage("assets/Djimmi.png");
  toadImg = loadImage("assets/toad.png");
  bossImg = loadImage("assets/Boss.png");
  
  startImg = loadImage("assets/Start.PNG");

  boardImg = loadImage("assets/board.png");
  kunaiknifeImg = loadImage("assets/kunaiKnife.png");
  boxerPunchImg = loadImage("assets/boxerPunch.PNG");

  s1Img = loadImage("assets/S1.PNG");
  s2Img = loadImage("assets/S2.PNG");
  s3Img = loadImage("assets/S3.PNG");
  s4Img = loadImage("assets/S4.PNG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

 

  ninja = createSprite(1190,540, 20, 20);
  ninja.addImage("ninja",ninjaImg);
  ninja.visible = false;
  
 //ninja.debug= true;
  ninja.setCollider("circle",0,0,60)

  start = createSprite(740, 370, 20,20);
  start.addImage("start",startImg);

  sensei = createSprite(170, 520, 20, 20);
  sensei.addImage("sensei",senseiImg);
  sensei.scale = 0.18
  sensei.visible = false;

  boxer = createSprite(440, 440, 20, 20);
  boxer.addImage("boxer", boxerImg);
  boxer.scale = 0.25;
  boxer.visible = false;

  board = createSprite(170, 520, 20, 20);
  board.addImage("board",boardImg);
  board.visible = false;
  board.scale = 0.05;

  s1 = createSprite(600, 250, 20, 20);
  s1.addImage("speech1", s1Img);
  s1.visible = false;
  s1.scale = 0.8;

  s2 = createSprite(600, 250, 20, 20);
  s2.addImage("speech2", s2Img);
  s2.visible = false;
  s2.scale = 0.8;

  s3 = createSprite(480, 310, 20, 20);
  s3.addImage("speech3", s3Img);
  s3.visible = false;
  s3.scale = 0.8;

  s4 = createSprite(600, 230, 20, 20);
  s4.addImage("speech4", s4Img);
  s4.visible = false;
  s4.scale = 0.8;

   // board.debug=true;
    board.setCollider("circle",0,0,20);

  /*  kunaiknife = createSprite(1190, 540, 20, 20);
    kunaiknife.addImage("kunaiknife",kunaiknifeImg);
    kunaiknife.scale = 0.5;
    kunaiknife.visible = false;*/
  edges = createEdgeSprites();

  kunaiKnifeGroup = new Group();
  punchGroup = new Group();
}

function draw() {
  background(startBG);

  if(mousePressedOver(start)) {
    gameState=1;
  }

  if(gameState === 1){
    ninja.visible = true;
    sensei.visible = true;
    
    background(bg1);
    start.visible = false;

    if(keyDown("LEFT_ARROW")){
      ninja.x=ninja.x -8;
    }
    
    if(keyDown("RIGHT_ARROW")){
      ninja.x = ninja.x +8;
    }

    ninja.bounceOff(edges);

    textSize(50);
    fill(255, 190, 38);
    text("Press 's' to continue.", 550, 660);

    if(keyDown("s") && gameState ===1){
      gameState=2;
    }
  }

  if(gameState ===2){
    background(bg1);
    board.visible = true;
    sensei.x = 460;
    sensei.y = 440;
    sensei.scale = 0.1;
    s1.visible = true;
    
  textSize(50);
    fill("goldenrod");
    text("Score:" + score, 1300, 100);
    if(flag === 1){
      fill(59, 255, 101);
      text("Press 'd' to continue.", 550, 660);
      fill(38, 197, 255);
      text("Shoot until you reach 50 points!", 450, 60);
    }
    
  if(keyDown("d")){
      s1.remove();
      s2.visible = true;
    }
    if(flag === 0 && score === 50){
      fill(255, 82, 82);
      text("Press 'a' to continue.", 550, 660);
    }
    
  }
 
  if(keyDown("SPACE") && gameState === 2){
    kunaiknife = createSprite(1190, 540, 20, 20);
    kunaiknife.addImage("kunaiknife",kunaiknifeImg);
    kunaiknife.scale = 0.5;
    kunaiknife.visible = true;
   
    kunaiknife.velocityX = -15;
    kunaiKnifeGroup.add(kunaiknife);
  }

  if(kunaiKnifeGroup.isTouching(board)){
    score = score + 50;
    flag = 0;
    console.log("knife is collided");
    kunaiKnifeGroup.destroyEach();
  }
  

  if(keyDown("a") && gameState === 2) {
    s2.visible = false;
    s3.visible = true; 
    flag =2;
   // text("Press 'w' to continue.", 550, 660);
  }
  if(flag ===2){
    text("Press 'w' to continue.", 550, 660);
  }

  if(keyDown("w") && gameState ===2) {
    s3.visible = false;
    s4.visible = true;
   // gameState = 3;
   flag =3;
  }

  if (flag ===3){
    text("Press 'q' to continue.", 550, 660);
  }

  if(keyDown("q") && gameState ===2) {
    gameState = 3
  }

  if(gameState === 3){
    background(bg2);
   // ninja.y = ;
    s4.visible = false;
    sensei.visible = false;
    board.visible = false;
    startBG.visible = false;
    boxer.visible = true;
    punches();
  }

  if(keyDown("UP_ARROW") && gameState === 3){
    ninja.y = ninja.y - 5;
  }
  if(keyDown("DOWN_ARROW") && gameState === 3){
    ninja.y = ninja.y + 5;
  }
  
  drawSprites();
  textSize(30);
  text(mouseX + "," + mouseY, mouseX, mouseY);
 // console.log(frameCount)
}

function punches(){
if(frameCount % 150 == 0){
  punch = createSprite(480, Math.round(random(200,700)), 20, 20);
  punch.addImage("box",boxerPunchImg);
  punch.velocityX = 8;
  punch.scale = 0.2;
  punchGroup.add(punch);
}
}