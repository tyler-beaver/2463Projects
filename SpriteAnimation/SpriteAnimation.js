let spelunkyGuy;
let x = 200;
let y = 200;
let r = 0;

function preload(){
  spelunkyGuy = loadImage("assets/SpelunkyGuy.png");
}

function setup() {
  createCanvas(700, 600);
  imageMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  translate(x, y)
  rotate(r); 
  //r += .1;
  scale(0.5);
  image(spelunkyGuy, 300, 250)
}
