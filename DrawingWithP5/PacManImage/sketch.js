function setup() {
  createCanvas(200, 100);
}

function draw() {
  background(0);

  push();
  pacMan = createGraphics(width, height);
  pacMan.fill(255,230,0);
  pacMan.ellipse(55,50,70,70);
  ctx = pacMan.canvas.getContext("2d");
  ctx.clip();
  pacMan.fill(0,0,0);
  pacMan.triangle(55, 50, 0, 100, 0, 0);
  image(pacMan,0,0);
  pop();

  push();
  blinkY = createGraphics(width, height);
  blinkY.fill(255,50,0);
  blinkY.rect(110, 15, 70, 70, 60, 60, 0, 0);
  ctxx = blinkY.canvas.getContext("2d");
  ctxx.clip();
  blinkY.fill(255,255,255);
  blinkY.noStroke();
  blinkY.ellipse(130, 50, 20, 20);
  blinkY.fill(0,0,255);
  blinkY.ellipse(130, 50, 13, 13);
  blinkY.fill(255,255,255);
  blinkY.ellipse(160, 50, 20, 20);
  blinkY.fill(0,0,255);
  blinkY.ellipse(160, 50, 13, 13);
  image(blinkY,0,0);
  pop();

}
