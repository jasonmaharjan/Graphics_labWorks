var canvas;
var radius = { x: 0, y: 0};
var center = { x: 0, y: 0};

function getParams() {
  var r_x = document.getElementById("form").elements[0].value;
  var r_y = document.getElementById("form").elements[1].value;
  var x = document.getElementById("form").elements[2].value;
  var y = document.getElementById("form").elements[3].value;

  r_x ? radius.x = int(r_x) : radius.x = 0;  
  r_y ? radius.y = int(r_y) : radius.y = 0;
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
  DrawEllipse(radius, center);
}

// Region Symmetry Implementation
function plotPoints_1 (x,y,center) {    
  var p1 = center.x + x;
  var p2 = center.y + y;

  var q1 = center.x - x;
  var q2 = center.y - y;

  var p3 = center.x + x;
  var p4 = center.y - y;

  var q3 = center.x - x;
  var q4 = center.y + y;

  point(p1,p2);
  point(q1,q2);
  point(p3,p4);
  point(q3,q4);
}

function plotPoints_2 (x, y, center) {
  var p1 = center.x + x;
  var p2 = center.y + y;

  var q1 = center.x - x;
  var q2 = center.y - y;

  var p3 = center.x + x;
  var p4 = center.y - y;

  var q3 = center.x - x;
  var q4 = center.y + y;

  point(p1,p2);
  point(q1,q2);
  point(p3,p4);
  point(q3,q4);
}

function DrawEllipse(r, center) {

  // for Region 1
  
  y = r.y; // initial point at (0,r)
  p = r.y**2 - (r.x**2)*r.y + 0.25 * r.x**2; // initial decision parameter
  var last_x = 0;
  var last_y = 0;

  for (x = 0; x <= ((y*r.x**2) / (r.y**2)); x++) {
    plotPoints_1(x,y, center);
    if (p >= 0) {
      y = y-1;
      p += 2*(x+1)*(r.y**2) + r.y**2 - 2*y*(r.x**2);
      last_x = x;
      last_y = y;
    }
    else {
      y = y;
      p += 2*(x+1)*(r.y**2) + r.y**2;
      last_x = x;
      last_y = y;
    }
  }

  // for Region 2
  // initial points for region 2 are the last points of region 1
  x = last_x;
  y = last_y;
  d = (r.y**2)*(x + 0.5)**2 + (r.x**2)*(y - 1)**2 - (r.x**2)*(r.y**2); // initial decision parameter

  while (y >= 0) {
    console.log(x, y, d);
    plotPoints_2(x,y, center);
    if (d > 0) {
      x = x;
      d = d - 2*(y-1)*(r.x**2) + (r.x**2);
    }
    else {
      x++;
      d = d + 2*(r.y**2)*x- 2*(y-1)*(r.x**2) + (r.x**2);
    }
    y--;
  }  
}

function windowResized() {
  centerCanvas();
}
