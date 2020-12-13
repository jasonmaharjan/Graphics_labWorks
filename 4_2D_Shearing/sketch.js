var canvas;
var params = { 
  x1: 0, y1: 0,
  x2: 150, y2: 0,
  x3: 150, y3: 150,
  x4: 0, y4: 150 
};
var transParams = { shear_x: 0, shear_y: 0 };

function getTransformationParams() {
  var x = document.getElementById("form").elements[0].value;
  var y = document.getElementById("form").elements[1].value;

  x ? transParams.shear_x = x : transParams.shear_x = 0;  
  y ? transParams.shear_y = y : transParams.shear_y = 0;
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

function draw() {
  noLoop();
  background(210);
  stroke(0);
  DrawRect(params);

  getTransformationParams();
  TransformRect(transParams);
}

function DrawRect(params) {
  noStroke();
  fill(80, 0, 100);
  beginShape();
  vertex(params.x1, params.y1);
  vertex(params.x2, params.y2);
  vertex(params.x3, params.y3);
  vertex(params.x4, params.y4);
  endShape(); 
}

// Shearing procedure here
function TransformRect(transParams) {
 if (transParams.shear_x !=0 && transParams.shear_y !=0) {
    alert('Please select only one shearing axis');
  }
  else if (transParams.shear_x != 0 || transParams.shear_y != 0) {
    // vertices of rectangle
    let a = [[params.x1], [params.y1], [1]];
    let b = [[params.x2], [params.y2], [1]];
    let c = [[params.x3], [params.y3], [1]];
    let d = [[params.x4], [params.y4], [1]];

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

    // SHEARING
    let final_matrix_1 = [[0], [0], [0]];
    let final_matrix_2 = [[0], [0], [0]];
    let final_matrix_3 = [[0], [0], [0]];
    let final_matrix_4 = [[0], [0], [0]];
    let matrix;

    if (transParams.shear_x != 0 && transParams.shear_y == 0) {
      matrix = [
        [1, transParams.shear_x, 0],
        [0, 1, 0],
        [0, 0, 1]      
      ];
    }
    else if (transParams.shear_y != 0 && transParams.shear_x == 0) {
      matrix = [
        [1, 0, 0],
        [transParams.shear_y, 1, 0],
        [0, 0, 1]      
      ];
    }
    let a1 = multiply(matrix, a, final_matrix_1);
    let b1 = multiply(matrix, b, final_matrix_2);
    let c1 = multiply(matrix, c, final_matrix_3);
    let d1 = multiply(matrix, d, final_matrix_4);

    final_points = {
      x1: a1[0],y1: a1[1],x2: b1[0],y2: b1[1],x3: c1[0],y3: c1[1],x4: d1[0],y4: d1[1]    
    }
    background(210);
    DrawRect(final_points);
  }

}

function windowResized() {
  centerCanvas();
}
