#include <Keyboard.h>;

void setup() {
  
  // put your setup code here, to run once:
  Serial.begin(9600);
  Keyboard.begin();
  //1
  pinMode(6, INPUT_PULLUP);
  //2
  pinMode(7, INPUT_PULLUP);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  int x1 = analogRead(A2);
  int y1 = analogRead(A1);
  int r1 = analogRead(A0);
  int s1 = 0;
  if(digitalRead(6) == HIGH){
    s1 = 0;
    Keyboard.release('x');
    delay(2);
    
  }
  else if(digitalRead(6) == LOW){
    s1 = 1;
    Keyboard.press('x');
    delay(10);
  }

  int x2 = analogRead(A5);
  int y2 = analogRead(A4);
  int r2 = analogRead(A3);
  int s2 = 0;
  if(digitalRead(7) == HIGH){
    s2 = 0;
    Keyboard.release('c');
    delay(2);
  }
  else if(digitalRead(7) == LOW){
    s2 = 1;
    Keyboard.press('c');
    delay(10);
    
  }


  int slider2 = analogRead(A5);
  Serial.print(x1);
  Serial.print(",");
  Serial.print(y1);
  Serial.print(",");
  Serial.print(r1);
  Serial.print(",");
  Serial.print(s1);
  Serial.print(",");

  Serial.print(x2);
  Serial.print(",");
  Serial.print(y2);
  Serial.print(",");
  Serial.print(r2);
  Serial.print(",");
  Serial.println(s2);
  


  delay(1);
}
