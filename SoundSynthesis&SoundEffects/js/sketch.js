let initTone = true;
let pitch = 900
let img; 

// Set up Tone
let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

let noiseFilter = new Tone.Filter(700, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter)

 
function preload() {
  img = loadImage("assets/heavyRain.png");
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  image(img, 0, 10);

  text('press spacebar to initialize audio!', 200, 300);
  text('then click rapidly to create heavy rain!', 180, 320);
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  // ampEnv.triggerAttackRelease('4n');
  // osc.frequency.setValueAtTime(pitch+200, '+1');
  // ampEnv.triggerAttackRelease('4n', '+1');

  if (mouseY) {
    noiseEnv.triggerAttackRelease(0.5);
  }

}