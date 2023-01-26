let characterOne;
let characterTwo;

function setup() {
  createCanvas(500, 500);
  characterOne = new Character(100, 100, 50);
  characterTwo = new Character(100, 300, 80);
}

function draw() {
  background(220);
  characterOne.draw();
  characterTwo.draw();
}

function mousePressed() {
  characterOne.mousePressed();
  characterTwo.mousePressed();
}

function mouseReleased() {
  characterOne.mouseReleased();
  characterTwo.mouseReleased();
}

function mouseDragged() {
  characterOne.mouseDragged();
  characterTwo.mouseDragged();
}

class Character {
  constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.dragging = false;
      this.dragStartX = -1;
      this.dragStartY = -1;
      this.characterStartX = -1;
      this.characterStartY = -1;
    }

  draw() {
    fill(255);
    square(this.x, this.y, this.size);
    fill(0);
    circle(this.x + 10, this.y + 10, 10);
    circle(this.x + this.size - 10, this.y + 10, 10);
    stroke(0);
    line(this.x + this.size / 4, this.y + this.size - 15, this.x + this.size - this.size / 4, this.y + this.size - 15);
    }

  mousePressed() {
    let insideX = mouseX >= this.x && mouseX <= this.x + this.size; 
    let insideY = mouseY >= this.y && mouseY <= this.y + this.size;
    console.log("in x: ", insideX);
    console.log("in y: ", insideY);
    let inside = insideX && insideY;
    if(inside) {
      this.dragging = true;
      this.dragStartX = mouseX;
      this.dragStartY = mouseY;
      this.characterStartX = this.x;
      this.characterStartY = this.y;
    }
  }

  mouseDragged() {
    if(this.dragging) {
      this.x = this.characterStartX + (mouseX - this.dragStartX);
      this.y = this.characterStartY + (mouseY - this.dragStartY);
    }
  }

  mouseReleased() {
    if(this.dragging) {
      this.dragging = false;
    } 
  }
}
