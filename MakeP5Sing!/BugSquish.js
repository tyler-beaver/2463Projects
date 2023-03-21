import Tone from "../libraries/Tone.js";

let spriteSheetFilenames = ["BadBug.png", "GoodBug.png"];
let spriteSheets = [];
let animations = [];

let soundSquish = new Tone.Player("assets/squish.wav", () => {
  soundSquish.toDestination();
  soundSquish.start();
});

let wrongBuzzer = new Tone.Player("assets/wrongBuzzer.wav", () => {
  wrongBuzzer.toDestination();
  wrongBuzzer.start();
});

let peaceful = new Tone.Player("assets/peaceful.wav", () => {
  peaceful.toDestination();
  peaceful.start();
});


const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 0, state: GameState.Start, targetSprite: 0};

function preload(){
  for (let i = 0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }

  soundSquish.toDestination();
  wrongBuzzer.toDestination();
  peaceful.toDestination();
}

function setup() {
  createCanvas(700, 600);
  imageMode(CENTER);
  angleMode(DEGREES);
  peaceful.loop = true;
peaceful.start();
  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = 50;

  animations = [];
  for (let i = 0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(random(spriteSheets), 80, 80, random(10, 690), random(10, 590), 3, random(1, 3), 3, random([0, 1]));
  }
}

function draw() {
  switch(game.state) {

    case GameState.Playing:
      background(220);
      for (i = 0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score, 30, 40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 620, 40)
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0) {
        game.state = GameState.GameOver;
      }
      break;

    case GameState.GameOver:
      game.maxScore = max(game.score, game.maxScore);
      background(0);
      fill(255);
      textSize(40);
      text("Game Over", 350, 300);
      textAlign(CENTER);
      textSize(25);
      text("Score: " + game.score, 350, 350);
      text("Max Score: " + game.maxScore, 350, 400)
      break;

    case GameState.Start:
      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Squish Game!", 350, 280);
      textSize(20);
      text("Press Any Key To Start:", 350, 310);
      textSize(20);
      text("Directions:", 350, 380);
      text("Click The Brown Bugs To Gain Points!", 350, 410);
      text("If You Click A Blue Bug You Lose A Point!", 350, 440);
      break;
  }
}

function keyPressed() {
  switch(game.state) {

    case GameState.Start:
      game.state = GameState.Playing;
      break;
      
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

function mousePressed() {
  switch(game.state){

    case GameState.Playing: 
    for (let i = 0; i < animations.length; i++) {
      let contains = animations[i].contains(mouseX, mouseY);
      if (contains) {
        if (animations[i].moving != 0) {
          animations[i].stop();
          if (animations[i].sprites === spriteSheets[game.targetSprite]) {
          soundSquish.start();
          game.score += 1;
          } else {
          wrongBuzzer.start();
          game.score -= 1;
          }
        } else {
          if (animations[i].xDirection === 1) {
            animations[i].moveRight();
          } else {
            animations[i].moveLeft();
          }
        }
        animations[i].stop();
      }
    }
      break;
  }
}

  class WalkingAnimation {
    constructor(sprites, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false) {
      this.sprites = sprites;
      this.sw = sw;
      this.sh = sh;
      this.dx = dx;
      this.dy = dy;
      this.u = 0; 
      this.v = 0;
      this.animationLength = animationLength;
      this.currentFrame = 0;
      this.moving = 1;
      this.xDirection = 1;
      this.speed = speed;
      this.framerate = framerate * speed;
      this.vertical = vertical; 
      this.speedIncrement = 0.012;
    }

    draw() {
      this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;

      push();
      translate(this.dx, this.dy);
      if (this.vertical)
        rotate(90);
      scale(this.xDirection, 1); 
      image(this.sprites, 0, -10, this.sw, this.sh, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
      pop();

      let proportionalFramerate = round(frameRate() / this.framerate);
      if (frameCount % proportionalFramerate == 0) {
        this.currentFrame ++;
      }

      if (this.vertical) {
        this.dy += this.moving * this.speed;
        this.move(this.dy, this.sw / 4, height - this.sw / 4)
      } else {
        this.dx += this.moving * this.speed;
        this.move(this.dx, this.sw / 4, width - this.sw / 3);
      }

      if (ceil(game.maxTime - game.elapsedTime) % 5 == 0) {
        this.speed += this.speedIncrement;
      }
    }

    move(position, lowerBounds, upperBounds) {
      if (position > upperBounds) {
        this.moveLeft();
      } else if (position < lowerBounds) {
        this.moveRight();
      }
    }

    moveRight() {
      this.moving = 1;
      this.xDirection = 1;
      this.v = 0;
    }

    moveLeft() {
      this.moving = -1;
      this.xDirection = -1;
      this.v = 0;
    }   

    contains(x, y) {
      let insideX = x >= this.dx - 26 && x <= this.dx + 25;
      let insideY = y >= this.dy - 35 && y <= this.dy + 35;
      return insideX && insideY;
    }

    stop() {
      this.moving = 0;
      this.u = 3;
    }
  }