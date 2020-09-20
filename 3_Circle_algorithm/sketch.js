var canvas;

var radius;
var center = { x: 0, y: 0};

function getParams() {
  var r = document.getElementById("form").elements[0].value;
  var x = document.getElementById("form").elements[1].value;
  var y = document.getElementById("form").elements[2].value;

  r ? radius = int(r) : radius = 0;  
  x ? center.x = int(x) : center.x = 0;
  y ? center.y = int(y) : center.y = 0;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(600, 600);
  centerCanvas();
}

function draw() {
  noLoop();
  background(210);
  stroke(0);
  getParams();
  DrawCircle(radius, center);
}

function plotPoints(x,y,center) {    
  // 8 Point Symmetry Implementation
  var p1 = center.x + x;
  var p2 = center.y + y;

  var q1 = center.x - x;
  var q2 = center.y - y;

  var p3 = center.x - x;
  var p4 = center.y + y;

  var q3 = center.x + x;
  var q4 = center.y - y;

  var p5 = center.x - y;
  var p6 = center.y - x;

  var q5 = center.x + y;
  var q6 = center.y + x;

  var p7 = center.x - y;
  var p8 = center.y + x;

  var q7 = center.x + y;
  var q8 = center.y - x;

  point(p1,p2);
  point(q1,q2);
  point(p3,p4);
  point(q3,q4);
  point(p5,p6);
  point(q5,q6);
  point(p7,p8);
  point(q7,q8);
}

function DrawCircle(radius, center) {
  // initial point at (0,r)
  y = radius;
  p = 5/4 - radius; // decision parameter

  for (x = 0; x <=y; x++) {
    plotPoints(x,y, center);
    
    if (p >= 0) {
      y = y-1;
      p += 2*(x+1) + 1 - 2*y;
    }
    else {
      y = y;
      p += 2*(x+1) + 1;
    }
  }
}

function windowResized() {
  centerCanvas();
}
