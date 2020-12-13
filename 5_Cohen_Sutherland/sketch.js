var canvas;
var params = { 
  x1: 0, y1: 0,
  x2: 0, y2: 0,
};

// Defining region codes 
const INSIDE = 0; // 0000 
const LEFT = 1; // 0001 
const RIGHT = 2; // 0010 
const BOTTOM = 4; // 0100 
const TOP = 8; // 1000 

// Defining x_max, y_max and x_min, y_min for 
// clipping rectangle. Since diagonal points are 
// enough to define a rectangle 
const x_max = 1000; 
const y_max = 450; 
const x_min = 400; 
const y_min = 150; 

// Function to compute region code for a point(x, y) 
function computeCode(x, y) { 
    // initialized as being inside 
    let code = INSIDE; 
    if (x < x_min) // to the left of rectangle 
        code |= LEFT; 
    else if (x > x_max) // to the right of rectangle 
        code |= RIGHT; 
    if (y < y_min) // below the rectangle 
        code |= BOTTOM; 
    else if (y > y_max) // above the rectangle 
        code |= TOP; 
    return code; 
} 
 
// Implementing Cohen-Sutherland algorithm 
// Clipping a line from P1 = (x2, y2) to P2 = (x2, y2) 
function cohenSutherlandClipper(x1,y1,x2,y2) { 
    // Compute region codes for P1, P2 
    var code1 = computeCode(x1, y1); 
    var code2 = computeCode(x2, y2); 
  
    // Initialize line as outside the rectangular window 
    var accept = false; 
    while (true) { 
        if ((code1 == 0) && (code2 == 0)) { 
            // If both endpoints lie within rectangle 
            accept = true; 
            break; 
        } 
        else if (code1 & code2) { 
            // If both endpoints are outside rectangle, 
            // in same region 
            break; 
        } 
        else { 
            // Some segment of line lies within the 
            // rectangle 
            var code_out; 
            var x, y; 
  
            // At least one endpoint is outside the 
            // rectangle, pick it. 
            if (code1 != 0) 
                code_out = code1; 
            else
                code_out = code2; 
  
            // Find intersection point; 
            // using formulas y = y1 + slope * (x - x1), 
            // x = x1 + (1 / slope) * (y - y1) 
            if (code_out & TOP) { 
                // point is above the clip rectangle 
                x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1); 
                y = y_max; 
            } 
            else if (code_out & BOTTOM) { 
                // point is below the rectangle 
                x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1); 
                y = y_min; 
            } 
            else if (code_out & RIGHT) { 
                // point is to the right of rectangle 
                y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1); 
                x = x_max; 
            } 
            else if (code_out & LEFT) { 
                // point is to the left of rectangle 
                y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1); 
                x = x_min; 
            } 
  
            // Now intersection point x, y is found 
            // We replace point outside rectangle 
            // by intersection point 
            if (code_out == code1) { 
                x1 = x; 
                y1 = y; 
                code1 = computeCode(x1, y1); 
                console.log("asdas")
            } 
            else { 
                x2 = x; 
                y2 = y; 
                code2 = computeCode(x2, y2); 
                console.log("zxczx")
            } 
        } 
    } 
    if (accept) { 
        // Display accepted portion of the line(line clipping)
        document.getElementsByClassName("result")[0].innerHTML = "Line is accepted";
        document.getElementsByTagName("style")[1].innerHTML = ".result {color: green}";
        background(210);
        DrawRect(x_min, y_min, x_max, y_max);
        DrawLine(x1, y1, x2, y2);

    } 
    else {
        // Rejected line
        document.getElementsByClassName("result")[0].innerHTML = "Line is rejected";
        document.getElementsByTagName("style")[1].innerHTML = ".result {color: red}";
    } 
} 
  
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
  canvas = createCanvas(1500, 625);
  centerCanvas();
}

function draw(x) {
  noLoop();
  background(210);
  stroke(0);
  getParams();
  DrawRect(x_min, y_min, x_max, y_max);
  DrawLine(params.x1, params.x2, params.y1, params.y2);

  if (x ==1) {
    if (params.x1 !=0 && params.x2 !=0 && params.y1 !=0 && params.y2 != 0) {
      cohenSutherlandClipper(params.x1, params.x2, params.y1, params.y2);
    }
  }
}

function DrawRect(x1, y1, x2, y2) {
  rectMode(CORNERS);
  fill(10, 200, 180);
  rect(x1, y1, x2, y2)
}

function DrawLine(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);   
}

function windowResized() {
  centerCanvas();
}
