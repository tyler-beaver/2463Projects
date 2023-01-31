let spelunkyGuy;
let x = 200;
let y = 200;
let r = 0;
let startTime = 5;
let timeRemaining = startTime;
let score = 0;
let topScore = 30;
let previousScores = [];
// let gameFont;

function preload(){
  spelunkyGuy = loadImage("assets/SpelunkyGuy.png");
  // gameFont = loadFont("assets/fontname.ttf") if I download the font file
}

function setup() {
  createCanvas(700, 600);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220); //can remove background to add trail 

  textFont('Arial'); //can call google font here, might have to download font and add to assets folder
  textSize(20);
  text("Time: " + ceil(timeRemaining), 50, 50); //could do timeRemaining.width - 200 to set related to width
  timeRemaining -= deltaTime / 1000;

  if (r >= 350) {
    r -= 360;
  }

  if (timeRemaining < 0) {
    timeRemaining = startTime;
    topScore = max(topScore, score);
    previousScores.push(score);
    score = 0;
  }

  let scoreY = 50;
  text("Score: " + score, 550, 50);
  text("Top Score: " + topScore, 250, height-20);
 
  for (let i = previousScores.length - 1; i >= max(0, previousScores.length - 3); i--) {
    scoreY += 20;
    text(previousScores[i], 20, scoreY);
  }
  
  push();
  translate(x, y)
  rotate(r); 
  //r += .1; //to rotate 
  scale(0.5, 0.5);
  image(spelunkyGuy, 300, 250)
  pop();
}

function keyTyped() {
  if (key === ' ') {
    print("space!")
    if ( r > 350 || r < 10) {
      score += 10;
    }
  }
}
