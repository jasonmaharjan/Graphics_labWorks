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

 const start_point = {
   x:200, y:200
 }

 const end_point = {
   x:450, y:300
}
 
 function draw() {
   noLoop();
   background(210);
   stroke(0);
   BLA(start_point, end_point)
 }
 
 function BLA(start_point,end_point){
   let dx= end_point.x - start_point.x;
   let dy = end_point.y -start_point.y;
   
   let slope = Math.abs(dy/dx);
   
   // initial decision parameter
   let decision_parameter = slope < 1 ? 2*dy-dx : 2*dx-dy; 
   
   for(x=start_point.x, y=start_point.y; x<=end_point.x && y<=end_point.y; slope < 1 ? x++: y++){
     point(x,y);

     if(decision_parameter < 0) {
       decision_parameter += slope < 1 ? 2*dy : 2*dx
     } 
     else {
       slope < 1 ? y++ : x++
       decision_parameter += slope < 1 ? 2*dy-2*dx : 2*dx-2*dy
     }
   }
 }


 function windowResized() {
   centerCanvas();
 }
 