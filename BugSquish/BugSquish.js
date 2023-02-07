//sprite character variables 
let spelunkyGuy;
let spelunkyGreen;
let spelunkyRobot;
//sprite animation variables 
let spelunkyGuyWalkingAnimation;
let spelunkyGreenWalkingAnimation;
let spelunkyRobotWalkingAnimation;

let spriteSheetFilenames = ["SpelunkyGuy.png", "SpelunkyGreen.png", "SpelunkyRobot.png"];
let spriteSheets = [];
let totalAnimations = 10;
let animations = [];

function preload(){
  //sprite images implemented
  for (let i = 0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
 
}

function setup() {
  createCanvas(700, 600);
  imageMode(CENTER);
  //angleMode(degrees); for bugs vertically
  //creating new character instances 
  for (let i = 0; i < totalAnimations; i++) {
  animations[i] = new WalkingAnimation(random(spriteSheets), 80, 80, random(100, 300), random(100, 300), 9, random(1, 5), 6);
  }
}

function draw() {
  background(220);
  //drawing the characters 
  for (i = 0; i < animations.length; i++) {
    animations[i].draw();
  }
}

function mousePressed() {
  for (let i = 0; i < animations.length; i++) {
    let contains = animations[i].contains(mouseX, mouseY);
    if (contains) {
      if (animations[i].moving != 0)
        animations[i].stop();
      else {
        if (animations[i].xDirection === 1)
          animations[i].moveRight();
        else
          animations[i].moveLeft();
      }
    }
  }
}

  class WalkingAnimation {
    constructor(sprites, sw, sh, dx, dy, animationLength, speed, framerate) {
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
    }

    draw() {
      this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;

      push();
      translate(this.dx, this.dy);
      //rotate(90); for bugs vertically 
      scale(this.xDirection, 1);
      rect(-26, -35, 50, 70);
      image(this.sprites, 0, 0, this.sw, this.sh, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
      pop();

      let proportionalFramerate = round(frameRate() / this.framerate);
      if (frameCount % proportionalFramerate == 0) {
        this.currentFrame ++;
      }

      this.dx += this.moving*this.speed;

      if (this.dx > width - this.sw / 3) {
        this.moveLeft();
      } else if (this.dx < this.sw / 3) {
        this.moveRight();
      }
    }

    moveRight() {
      this.moving = 1;
      this.xDirection = 1;
    }

    moveLeft() {
      this.moving = -1;
      this.xDirection = -1;
    }   

    contains(x, y) {
      let insideX = x >= this.dx - 26 && x <= this.dx + 25;
      let insideY = y >= this.dy - 35 && y <= this.dy + 35;
      return insideX && insideY;
    }

    stop() {
      this.moving = 0;
    }
  }