var canvas;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(600, 600);
  centerCanvas();
}



function windowResized() {
  centerCanvas();
}
