const int joyX = A0; // Joystick X-axis pin
const int button = 2; // Joystick button pin
const int ledPin = 9; // LED pin
int joyValue = 0; // Joystick X-axis value
int buttonState = 0; // Joystick button state
int ledState = LOW; // LED state
int prevJoyValue = 512; // Previous joystick X-axis value
bool landedOnPlatform = false; // Flag to track if player landed on a platform

void setup() {
  pinMode(joyX, INPUT);
  pinMode(button, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Read joystick input
  joyValue = analogRead(joyX);

  // Check if joystick moved left or right
  if (joyValue < prevJoyValue - 10) {
    // Move player left
    Serial.write('L');
  } else if (joyValue > prevJoyValue + 10) {
    // Move player right
    Serial.write('R');
  }

  // Update previous joystick value
  prevJoyValue = joyValue;

  // Read joystick button state
  buttonState = digitalRead(button);

  // Check if button is pressed and player landed on a platform
  if (buttonState == LOW && landedOnPlatform) {
    // Toggle LED state
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
    landedOnPlatform = false; // Reset landedOnPlatform flag
  }

  // Check if player landed on a platform
  if (Serial.available() > 0) {
    if (Serial.read() == 'P') {
      landedOnPlatform = true;
    }
  }
}
