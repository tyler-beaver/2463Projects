let port;
let writer;
let activationState = { active: false, inputValue: 0 };

function setup() {
  createCanvas(400, 400);
  if ("serial" in navigator) {
    let button = createButton("connect");
    button.position(0, 0);
    button.mousePressed(connect);
  }
  document.addEventListener('mousedown', () => {
    activationState.active = !activationState.active;
    writer.write(new Uint8Array([activationState.active ? 255 : 0]));
  });
}

async function connect() {
  port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  writer = port.writable.getWriter();

  // print connection message to console
  console.log("Connected to serial port");

  // start reading data from the serial port
  readLoop();
}

async function readLoop() {
  const reader = port.readable.getReader();
  
  while (true) {
    try {
      const { value, done } = await reader.read();
      if (done) {
        console.log('Serial port closed');
        reader.releaseLock();
        break;
      }
      activationState.inputValue = value[0];
      console.log("Input value: " + activationState.inputValue);
    } catch (error) {
      console.error(error);
      reader.releaseLock();
      break;
    }
  }
}

function draw() {
  let brightness = map(activationState.inputValue, 0, 1023, 0, 100);
  let colorValue = map(activationState.inputValue, 0, 1023, 0, 255);
  if (brightness > 50) {
    background(255 - colorValue);
  } else {
    background(colorValue, 10, 200);
  }
}
