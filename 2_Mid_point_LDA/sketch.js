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

const sp = { x:100, y:150 }; 
const ep = { x:400, y:300 };

function draw() {
  noLoop();
  background(210);
  stroke(0);
  MPA(sp, ep)
}

function MPA(sp,ep) {
  let dx= ep.x - sp.x;
  let dy = ep.y -sp.y;

  // initial decision parameter
  let decision_parameter = dy - (dx/2);
  
  for(x=sp.x, y=sp.y; x<=ep.x && y<=ep.y; x++) {
    point(x,y);

    if(decision_parameter < 0) {
      decision_parameter += dy;
    }
    else {
      decision_parameter += (dy-dx);
      y++;
    }
  }
}

function windowResized() {
  centerCanvas();
}
