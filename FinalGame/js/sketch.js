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
var platformImg;

//  Preload the Image Sprites
function preload() {
  doodlerLeftImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler.png");
  doodlerRightImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler-right.png");
  platformImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-platform.png");
}

//  Controllers
function setup() {
  createCanvas(600, 600);
  frameRate(60);
  gameStarted = false;
}

function draw() {
  background(247, 239, 231);
  if(gameStarted == true) {
    //Set up and draw the game
    drawPlatforms();
    drawDoodler();
    checkCollision();
    moveDoodler();
    moveScreen();
    textSize(20);
    text("Score: " + score, 500, 50);
  } else {
    // Start menu
    fill(0);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Let's Jump", width/2, height/2 - 100);
    textSize(30);
    text("Score: " + score, width/2, height/2 - 50);
    textSize(30);
    text("High Score: " + highScore, width/2, height/2 - 15);
    textSize(15);
    text("Game Directions:", width/2, height/2 + 80);
    text("Click Any button to begin", width/2, height/2 + 110);
    text("Score depends on the distance traveled, but be careful ", width/2, height/2 + 130);
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
  image(doodlerLeftImg, doodlerX, doodlerY, doodlerSize, doodlerSize);
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

//  Collisions
function checkCollision() {
  platformList.forEach(function(plat) {
    if(
      doodlerX < plat.xPos + plat.width &&
      doodlerX + doodlerSize > plat.xPos &&
      doodlerY + doodlerSize < plat.yPos + plat.height &&
      doodlerY + doodlerSize > plat.yPos &&
      doodlerVelocity > 0
    ) {
      doodlerVelocity = -10;
    }
  });
  
  if(doodlerY > height) {
    if(score > highScore) {
      highScore = score;
    }
    gameStarted = false;
    platformList = [];
  }
  
  // screen wraps from left to right
  if(doodlerX < -doodlerSize) {
    doodlerX = width;
  } else if(doodlerX > width) {
    doodlerX = -doodlerSize;
  }
}