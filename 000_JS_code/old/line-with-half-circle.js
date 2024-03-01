let startX, startY, endX, endY, perpX, perpY, extendX, extendY;
let d = 50; // Distance from the end point to the perpendicular vertex and extended vertex



function setup() {
  createCanvas(400, 400);

  // Randomly select the start and end points
  startX = random(width);
  startY = random(height);
  endX = random(width);
  endY = random(height);

  // Calculate the angle of the original line
  let angle = atan2(endY - startY, endX - startX);

  // Calculate the slope of the original and perpendicular line
  let slope = tan(angle);
  let perpSlope = -1 / slope;  

  // Calculate the coordinates of the perpendicular vertex
  perpX = endX + d / sqrt(1 + perpSlope * perpSlope);
  perpY = endY + perpSlope * (perpX - endX);

  
let d2 = (d*HALF_PI);
  // Calculate the deltas for the extended vertex
  let deltaX = d2 * cos(angle);
  let deltaY = d2 * sin(angle);

  // Calculate the coordinates of the extended vertex
  extendX = perpX + deltaX;
  extendY = perpY + deltaY;
  // Calculate the coordinates of the other perpendicular vertex
  perpX2 = endX - d / sqrt(1 + perpSlope * perpSlope);
  perpY2 = endY - perpSlope * (perpX - endX);
  
    // Calculate the coordinates of the extended vertex
  const newLocal = extendX2 = perpX2 + deltaX;
  extendY2 = perpY2 + deltaY;

}

function draw() {
  background(220);

  beginShape();
  vertex(startX, startY); // Start vertex
  vertex(endX, endY);     // End vertex
  vertex(perpX, perpY);   // Perpendicular vertex
  bezierVertex(extendX, extendY,extendX2, extendY2,perpX2,perpY2);
    //vertex(extendX, extendY);
      //vertex(extendX2, extendY2);
    //vertex(perpX2, perpY2); // 
  //vertex(endX, endY);     // End vertex

  endShape(); // Close the shape

  // Optional: Display information
  fill(0);
  text("Original Line Angle: " + degrees(angle).toFixed(2) + "°", 10, 20);
  text("Perpendicular Vertex: (" + perpX.toFixed(2) + ", " + perpY.toFixed(2) + ")", 10, 35);
  text("Extended Vertex: (" + extendX.toFixed(2) + ", " + extendY.toFixed(2) + ")", 10, 50);
}
