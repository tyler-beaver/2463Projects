var doodlerSize = 60;
var doodlerVelocity, doodlerX, doodlerY;
var doodlerXSpeed = 4;
var platformWidth = 85;
var platformHeight = 15;
var numOfPlatforms = 7;
var platformList = [];
var platYChange = 0;
var gameStarted;
var score = 0;
var highScore = 0;
var doodlerNormalImg, doodlerLeftImg, doodlerRightImg;
var platformImg, speedPlatformImg, timePlatformImg, springImg;

var platformSound = new Tone.Player("assets/platformSound.wav");
platformSound.volume.value = -2;
var springSound = new Tone.Player("assets/springSound.wav");
var backgroundSound = new Tone.Player("assets/backgroundSound.wav");
backgroundSound.loop = true; // loop the sound
backgroundSound.volume.value = -6;

function preload() {
  doodlerLeftImg = loadImage("assets/leftChar.png");
  doodlerRightImg = loadImage("assets/rightChar.png");
  doodlerNormalImg = loadImage("assets/normalChar.png");
  platformImg = loadImage("assets/regLog.png");
  springImg = loadImage("assets/spring.png");
  speedPlatformImg = loadImage("assets/speedLog.png");
  timePlatformImg = loadImage("assets/timeLog.png");

  platformSound.toDestination();
  springSound.toDestination();
  backgroundSound.toDestination();
}

function setup() {
  createCanvas(600, 850);
  frameRate(60);
  gameStarted = false;
}

function draw() {
  background(240);
  if (gameStarted == true) {
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
    text("Jump", width / 2, height / 2 - 100);
    textSize(30);
    text("Score: " + score, width / 2, height / 2 - 50);
    textSize(30);
    text("High Score: " + highScore, width / 2, height / 2 - 15);
    textSize(30);
    text("Game Directions:", width / 2, height / 2 + 80);
    textSize(15);
    text("Click Any Button To Begin!", width / 2, height / 2 + 110);
    text("Use The Left and Right Arrow Keys To Move", width / 2, height / 2 + 130);
    text("Increase Your Score The Furher You Go, But Be Careful Don't Fall", width / 2, height / 2 + 150);
  }
}

function moveScreen() {
  if (doodlerY < 400) {
    platYChange = 5; // Increase the value to make platforms move down faster
    doodlerVelocity += 0.25;
  } else {
    platYChange = 0;
  }
}

function keyPressed() {
  if (gameStarted == false) {
    score = 0;
    setupPlatforms();
    backgroundSound.start();
    doodlerY = 550;
    doodlerX = platformList[platformList.length - 1].xPos + 15;
    doodlerVelocity = 0.1;
    gameStarted = true;
  }
}

function drawDoodler() {
  fill(204, 200, 52);
  if (keyIsDown(LEFT_ARROW)) {
    image(doodlerLeftImg, doodlerX, doodlerY, doodlerSize + 20, doodlerSize + 20);
  } else if (keyIsDown(RIGHT_ARROW)) {
    image(doodlerRightImg, doodlerX, doodlerY, doodlerSize + 20, doodlerSize + 20);
  } else
    image(doodlerNormalImg, doodlerX, doodlerY, doodlerSize + 20, doodlerSize + 20);
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
  for (var i = 0; i < numOfPlatforms; i++) {
    var platGap = height / numOfPlatforms;
    var newPlatformYPosition = i * platGap;
    var plat = new Platform(newPlatformYPosition);
    platformList.push(plat);
  }
}

function Platform(newPlatformYPosition) {
  this.xPos = random(15, 500);
  this.yPos = newPlatformYPosition;
  this.width = platformWidth;
  this.height = platformHeight;
  this.spring = random() < 0.1;
  this.landedOn = false; // Add a property to track if platform has been landed on before
  var typeRandom = random();
  if (typeRandom < 0.1) {
    this.type = 'time';
  } else if (typeRandom < 0.6) {
    this.type = 'normal';
  } else {
    this.type = 'speed';
    this.direction = random() < 0.5 ? 'left' : 'right';
    this.startX = this.xPos;
    this.endX = this.xPos + 200; // Change this value to control the range of motion
  }
}

function drawPlatforms() {
  var landedIndex = -1;
  platformList.forEach(function (plat) {
    plat.yPos += platYChange;
    if (plat.type === 'normal') {
      image(platformImg, plat.xPos, plat.yPos, plat.width, plat.height);
    } else if (plat.type === 'speed') {
      image(speedPlatformImg, plat.xPos, plat.yPos, plat.width, plat.height);
      if (plat.direction === 'left') {
        plat.xPos -= 2;
        if (plat.xPos < plat.startX) {
          plat.direction = 'right';
        }
      } else {
        plat.xPos += 2;
        if (plat.xPos > plat.endX) {
          plat.direction = 'left';
        }
      }
    } else if (plat.type === 'time') {
      if (!plat.landedOn) {
        image(timePlatformImg, plat.xPos, plat.yPos, plat.width, plat.height);
      }
      else if (plat.landedOn && platformList.indexOf(plat) !== landedIndex) { // check if the platform's image has been removed
        landedIndex = platformList.indexOf(plat);
      }
    }
    if (plat.spring) {
      image(springImg, plat.xPos, plat.yPos - 5, plat.width - 5, plat.height - 3);
    }
    if (doodlerX + doodlerSize / 2 > plat.xPos &&
      doodlerX + doodlerSize / 2 < plat.xPos + plat.width &&
      doodlerY + doodlerSize > plat.yPos &&
      doodlerY + doodlerSize < plat.yPos + plat.height &&
      doodlerVelocity > 0) {
      if (plat.spring) {
        doodlerVelocity = -15;
      } else {
        doodlerVelocity = -10;
      }
      plat.landedOn = true;
      landedIndex = platformList.indexOf(plat);
    }
    if (plat.yPos > 850) {
      score++;
      platformList.pop();
      var newPlat = new Platform(0);
      platformList.unshift(newPlat); // add to front
    }
  });
  
  if (landedIndex > -1) {
    var landedPlatform = platformList[landedIndex];
    if (landedPlatform.type === 'time') {
      landedPlatform.landedOn = false;
      platformList.splice(landedIndex, 1);
    }
  }
}

function checkCollision() {
  for (var i = 0; i < platformList.length; i++) {
    var p = platformList[i];
    if (doodlerVelocity > 0 && // doodler is falling
        doodlerY + doodlerSize + 10 > p.yPos && // doodler is above the platform
        doodlerY + doodlerSize < p.yPos + p.height && // doodler is below the top of the platform
        doodlerX + doodlerSize > p.xPos && // doodler is to the right of the left edge of the platform
        doodlerX < p.xPos + p.width // doodler is to the left of the right edge of the platform
    ) {
      platformSound.start();
      doodlerVelocity = -10;
      if (!p.landedOn) {
        p.landedOn = true;
        if (p.type === 'time') {
          setTimeout(hideTimePlatform, 5000); // hide the timePlatformImg after 5 seconds
        }
      }
      if (p.spring) {
        springSound.start();
        doodlerVelocity = -15;
      }
      score++;
      break;
    }
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
}

function hideTimePlatform() {
  timePlatformImg.hide();
}
