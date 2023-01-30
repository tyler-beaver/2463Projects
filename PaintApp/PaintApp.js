var brushColor;

function setup() {
  createCanvas(700, 500);
  background(255)
  brushColor = color(0);
}

function draw() {
  if (mouseIsPressed) {
    if (mouseX <= 30) {
      if (mouseY <= 30) {
        brushColor = color(255, 0, 0);
      } else if (mouseY <= 60) {
        brushColor = color(255, 140, 0);
      } else if (mouseY <= 90) {
        brushColor = color(255, 255, 0);
      } else if (mouseY <= 120) {
        brushColor = color(0, 255, 0);
      } else if (mouseY <= 150) {
        brushColor = color(0, 255, 255);
      } else if (mouseY <= 180) {
        brushColor = color(0, 0, 255);
      } else if (mouseY <= 210) {
        brushColor = color(255, 0, 255);
      } else if (mouseY <= 240) {
        brushColor = color(150, 75, 0);
      } else if (mouseY <= 270) {
        brushColor = color(255, 255, 255);
      } else if (mouseY <= 300) {
        brushColor = color(0, 0, 0);
      }
    }
    stroke(brushColor);
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 30, 30);
  fill(255, 140, 0);
  rect(0, 30, 30, 30);
  fill(255, 255, 0);
  rect(0, 60, 30, 30);
  fill(0, 255, 0);
  rect(0, 90, 30, 30)
  fill(0, 255, 255);
  rect(0, 120, 30, 30);
  fill(0, 0, 255);
  rect(0, 150, 30, 30);
  fill(255, 0, 255);
  rect(0, 180, 30, 30);
  fill(150, 75, 0);
  rect(0, 210, 30, 30);
  fill(255, 255, 255);
  rect(0, 240, 30, 30);
  fill(0, 0, 0);
  rect(0, 270, 30, 30);
}