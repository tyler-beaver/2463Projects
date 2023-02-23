
// let sound1 = new Tone.Player("sounds/chicken.wav");

let sounds = new Tone.Players({

  "bye": "sounds/bye.wav",
  "whoosh": "sounds/whoosh.flac",
  "doorbell": "sounds/doorbell.wav",
  "yay": "sounds/yay.wav"

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["bye", "whoosh", "doorbell", "yay"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(10 + index + 10, 20 + index * 50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(10, 120, 100);
  text('Press The Buttons For Sound!', 110, 250)
  text('Use The Sliders Below To Change Tone And Frequency!', 10, 390)
}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}