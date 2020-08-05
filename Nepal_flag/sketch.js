function setup() { // onlyOnce
  createCanvas(500, 500);
}

function draw() { // Loops infinitely
  background(240);
  constructFlag();
}

function constructFlag(){
  createOutline();
  constructMoon();
  constructStar(width * 0.28, height * 0.73, 42, 65, 12);
}

function createOutline() {
  stroke(0, 56, 147);   // Deep Powder Blue
  strokeWeight(15);
  fill(220, 20, 60);    // Crimson Red
  beginShape();
  vertex(50, height - 10);
  vertex(50, 15);
  vertex(width - 80, height / 2);
  vertex(width * (1 / 3), height / 2);
  vertex(width - 80, height - 10);
  endShape(CLOSE);
}

function constructMoon() {
  noStroke();
  // overlap two ellipses
  fill(255,255,255);
  ellipse(width *0.28, height * (0.33), 130, 120);

  fill(220, 20, 60);
  ellipse(width * 0.28, height * (0.3), 130, 110);

  constructStar(width * (0.28), height * (0.380), 23, 35, 14);
}

function constructStar(x, y, radius1, radius2, npoints) {

  fill(255, 255, 255);
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}