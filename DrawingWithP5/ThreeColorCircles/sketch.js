function Canvas(){
    createCanvas(200, 200);
}

function draw(){
    background(255,255,255);

    //red circle 
    push();
    fill(255,0,0)
    noStroke();
    circle(50,35,55);
    pop();

    //blue circle
    push();
    fill(0,0,255);
    noStroke();
    circle(30,60,55);
    pop();

    //green circle
    push();
    fill(0,255,0);
    noStroke();
    circle(70,60,55); 
    pop();

    // push();
    // noStroke();
    // colorMode(HSB, 255);
    // let c = color(0, 126, 255);
    // fill(c);
    // rect(15, 20, 35, 60);
    // let value = saturation(c); // Sets 'value' to 126
    // fill(value);
    // rect(50, 20, 35, 60);
    // pop();
}


