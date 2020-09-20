var canvas;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

const startPoint= {
  X: 150,
  Y: 100
 }
 
 const endPoint= {
  X: 400,
  Y: 250
 }

function setup() {
  canvas = createCanvas(600, 600);
  centerCanvas();
}
function draw() {
  noLoop();
  background(230);
  stroke(0);
  DDA();
}

function DDA() {
  let dx = parseFloat(endPoint.X - startPoint.X) 
  let dy = parseFloat(endPoint.Y - startPoint.Y)
  let steps = 0;
  
  if(Math.abs(dx) > Math.abs(dy)) {
    steps = Math.abs(dx)
  } 
  else {
    steps = Math.abs(dy)
  }
  
  x_increment = dx/steps
  y_increment = dy/steps
  
  let x = startPoint.X
  let y = startPoint.Y
  
  for(i=0; i<steps; i++) {
    point(x,y);
    x = x + x_increment;
    y = y + y_increment;
  }
}

function windowResized() {
  centerCanvas();
}
