var doodlerSize = 60;
var doodlerX;
var doodlerY;
var doodlerVelocity;
var doodlerXSpeed = 4;
var platformWidth = 85;
var platformHeight = 15;
var numOfPlatforms = 5;
var platformList = [];
var platYChange = 0;
var gameStarted;
var score = 0;
var highScore = 0;
var doodlerLeftImg;
var doodlerRightImg;
var doodlerNormalImg;
var platformImg;
var springImg;

//  Preload the Image Sprites
function preload() {
  doodlerLeftImg = loadImage("assets/leftChar.png");
  doodlerRightImg = loadImage("assets/rightChar.png");
  doodlerNormalImg = loadImage("assets/normalChar.png");
  platformImg = loadImage("assets/regLog.png");
  springImg = loadImage("assets/spring.png");
}

//  Controllers
function setup() {
  createCanvas(600, 600);
  frameRate(60);
  gameStarted = false; 
}

function draw() {
  background(240);
  if(gameStarted == true) {
    //Set up and draw the game
    drawPlatforms();
    drawDoodler();
    checkCollision();
    moveDoodler();
    moveScreen();
    textSize(25);
    fill(0);
    text("Score: " + score, 500, 50);
  } else {
    // Start menu
    fill(0);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Jump", width/2, height/2 - 100);
    textSize(30);
    text("Score: " + score, width/2, height/2 - 50);
    textSize(30);
    text("High Score: " + highScore, width/2, height/2 - 15);
    textSize(30);
    text("Game Directions:", width/2, height/2 + 80);
    textSize(15);
    text("Click Any Button To Begin!", width/2, height/2 + 110);
    text("Use The Left and Right Arrow Keys To Move", width/2, height/2 + 130);
    text("Increase Your Score The Furher You Go, But Be Careful Don't Fall", width/2, height/2 + 150);
  }
}

function moveScreen() {
  if(doodlerY < 250) {
    platYChange = 3;
    doodlerVelocity += 0.25;
  } else {
    platYChange = 0;
  }
}

// Start Game
function keyPressed() {
  if(gameStarted == false) {
    score = 0;
    setupPlatforms();
    doodlerY = 350;
    doodlerX = platformList[platformList.length - 1].xPos + 15;
    doodlerVelocity = 0.1;
    gameStarted = true;
  }
}

//  Doodler
function drawDoodler() {
  fill(204, 200, 52);
  if(keyIsDown(LEFT_ARROW)) {
    image(doodlerLeftImg, doodlerX, doodlerY, doodlerSize+20, doodlerSize+20);
  } else if(keyIsDown(RIGHT_ARROW)) {
    image(doodlerRightImg, doodlerX, doodlerY, doodlerSize+20, doodlerSize+20);
  } else
    image(doodlerNormalImg, doodlerX, doodlerY, doodlerSize+20, doodlerSize+20);
}

function moveDoodler() {
  // doodler falls with gravity
  doodlerVelocity += 0.2;
  doodlerY += doodlerVelocity;

  if (keyIsDown(LEFT_ARROW)) {
    doodlerX -= doodlerXSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    doodlerX += doodlerXSpeed;
  }
}

//  Platforms
function setupPlatforms() {
  for(var i=0; i < numOfPlatforms; i++) {
    var platGap = height / numOfPlatforms;
    var newPlatformYPosition = i * platGap;
    var plat = new Platform(newPlatformYPosition);
    platformList.push(plat);
  }
}

function drawPlatforms() {
  fill(106, 186, 40);
  platformList.forEach(function(plat) {
    // move all platforms down
    plat.yPos += platYChange;
    image(platformImg, plat.xPos, plat.yPos, plat.width, plat.height);

    if(plat.yPos > 600) {
      score++;
      platformList.pop();
      var newPlat = new Platform(0);
      platformList.unshift(newPlat); // add to front
    }
  });
}

function Platform(newPlatformYPosition) {
  this.xPos = random(15, 500);
  this.yPos = newPlatformYPosition;
  this.width = platformWidth;
  this.height = platformHeight;
}

function checkCollision() {
  platformList.forEach(function(plat) {
    if (
      doodlerX + doodlerSize / 2 > plat.xPos && // doodler right edge > platform left edge
      doodlerX + doodlerSize / 2 < plat.xPos + plat.width && // doodler left edge < platform right edge
      doodlerY + doodlerSize + 15> plat.yPos && // doodler bottom edge > platform top edge
      doodlerY + doodlerSize < plat.yPos + plat.height && // doodler top edge < platform bottom edge
      doodlerVelocity > 0
    ) {
      doodlerVelocity = -10;
    }
  });

  if (doodlerY > height) {
    if (score > highScore) {
      highScore = score;
    }
    gameStarted = false;
    platformList = [];
  }

  // screen wraps from left to right
  if (doodlerX < -doodlerSize) {
    doodlerX = width;
  } else if (doodlerX > width) {
    doodlerX = -doodlerSize;
  }
}
