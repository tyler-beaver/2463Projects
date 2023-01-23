function Canvas(){
    createCanvas(200, 200);
}

function draw(){
    background(255,255,255);

    //red circle 
    push();
    fill(255,0,0,100)
    noStroke();
    circle(50,35,55);
    pop();

    //blue circle
    push();
    fill(0,0,255,100);
    noStroke();
    circle(30,60,55);
    pop();

    //green circle
    push();
    fill(0,255,0,100);
    noStroke();
    circle(70,60,55); 
    pop();
    
}


