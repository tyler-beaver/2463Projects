const int ledPin = 3;
const int potPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Read the value from the potentiometer and map it to a byte (0-255)
  byte potVal = map(analogRead(potPin), 0, 1023, 0, 255);

  // Send the value to the computer
  Serial.write(potVal);

  // Turn on/off the LED based on the mouse click
  if (Serial.available()) {
    byte state = Serial.read();
    if (state == 255) {
      digitalWrite(ledPin, HIGH);
    } else {
      digitalWrite(ledPin, LOW);
    }
  }
}
