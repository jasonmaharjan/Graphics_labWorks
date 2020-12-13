var canvas;
var params = { 
  x1: 0, y1: 0,
  x2: 0, y2: 0,
};

var transParams = { tf_x: 0, tf_y: 0, r: 0, sx: 0, sy: 0};

function getParams() {
  var x1 = document.getElementById("form-1").elements[0].value;
  var y1 = document.getElementById("form-1").elements[1].value;
  var x2 = document.getElementById("form-1").elements[2].value;
  var y2 = document.getElementById("form-1").elements[3].value;

  x1 ? params.x1 = int(x1) : params.x1 = 0;  
  y1 ? params.y1 = int(y1) : params.y1 = 0;
  x2 ? params.x2 = int(x2) : params.x2 = 0;
  y2 ? params.y2 = int(y2) : params.y2 = 0;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  //var y = (windowHeight - height) / 2;
  canvas.position(x, 150);
}

function setup() {
  canvas = createCanvas(600, 600);
  centerCanvas();
}

function draw(axis) {
  noLoop();
  background(210);
  stroke(0);
  getParams();
  DrawLine(params);

  switch (axis) {
    case 1:
      ReflectLine(params);
  }
  
}

function DrawLine(params) {
  line(params.x1, params.y1, params.x2, params.y2);   
}

// Reflection about x = y
function ReflectLine(params) {
  if (params) {
    // initial start and end points
    let start = [[params.x1], [params.y1], [1]];
    let end = [[params.x2], [params.y2], [1]];

    // Matrix-multiplication algorithm
    function multiply(matrix_1, matrix_2, final_matrix) {
      for (i=0; i<3; i++) {
        let temp = 0;
        for (j=0; j<3; j++) {
          temp += matrix_1[i][j] * matrix_2[j];
        }
        final_matrix[i] = temp;
      }
      return final_matrix;
    }

    let final_matrix_1 = [[0], [0], [0]];
    let final_matrix_2 = [[0], [0], [0]];
    let matrix = [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 1]      
    ];

    let a = multiply(matrix, start, final_matrix_1);
    let b = multiply(matrix, end, final_matrix_2);

    final_points = {
      x1: a[0],
      y1: a[1],
      x2: b[0],
      y2: b[1],
    }
    DrawLine(final_points);
  }
}  

function windowResized() {
  centerCanvas();
}
