let spelunkyGuy;
let spelunkyGreen;
let spelunkyRobot;
let spelunkyGuyWalkingAnimation;
let spelunkyGreenWalkingAnimation;
let spelunkyRobotWalkingAnimation;

function preload(){
  spelunkyGuy = loadImage("assets/SpelunkyGuy.png");
  spelunkyGreen = loadImage("assets/SpelunkyGreen.png");
  spelunkyRobot = loadImage("assets/SpelunkyRobot.png")
}

function setup() {
  createCanvas(700, 600);
  imageMode(CENTER);
  spelunkyGuyWalkingAnimation = new WalkingAnimation(spelunkyGuy, 80, 80, 300, 200, 9);
  spelunkyGreenWalkingAnimation = new WalkingAnimation(spelunkyGreen, 80, 80, 200, 300, 9);
  spelunkyRobotWalkingAnimation = new WalkingAnimation(spelunkyRobot, 80, 80, 400, 400, 9);
}

function draw() {
  background(220);
  spelunkyGuyWalkingAnimation.draw();
  spelunkyGreenWalkingAnimation.draw();
  spelunkyRobotWalkingAnimation.draw();
}

  function keyPressed() {
    spelunkyGuyWalkingAnimation.keyPressed(RIGHT_ARROW, LEFT_ARROW);
    spelunkyGreenWalkingAnimation.keyPressed(LEFT_ARROW, RIGHT_ARROW);
    spelunkyRobotWalkingAnimation.keyPressed(RIGHT_ARROW, LEFT_ARROW);
  }

  function keyReleased() {
    spelunkyGuyWalkingAnimation.keyReleased(RIGHT_ARROW, LEFT_ARROW);
    spelunkyGreenWalkingAnimation.keyReleased(LEFT_ARROW, RIGHT_ARROW);
    spelunkyRobotWalkingAnimation.keyReleased(RIGHT_ARROW, LEFT_ARROW);
  }

  class WalkingAnimation {
    constructor(sprites, sw, sh, dx, dy, animationLength) {
      this.sprites = sprites;
      this.sw = sw;
      this.sh = sh;
      this.dx = dx;
      this.dy = dy;
      this.u = 0; 
      this.v = 0;
      this.animationLength = animationLength;
      this.currentFrame = 0;
      this.moving = 0;
      this.xDirection = 1;
    }

    draw() {
      this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;

      push();
      translate(this.dx, this.dy);
      scale(this.xDirection, 1);
      image(this.sprites, 0, 0, this.sw, this.sh, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
      pop();

      if (frameCount % 6 == 0) {
        this.currentFrame ++;
      }
      this.dx += this.moving;
    }

    keyPressed(right, left) {
        if (keyCode === right) {
          this.moving = 1;
          this.xDirection = 1;
          this.currentFrame = 1;
        } else if (keyCode === left) {
          this.moving = -1;
          this.xDirection = -1;
          this.currentFrame = 1;
      }
    }

    keyReleased(right, left) {
      if (keyCode === right || keyCode === left) {
        this.moving = 0;
      }
    }
  }