function setup() {
    createCanvas(800, 800);
    noLoop();
  }
  
  function draw() {
    background(255);
    stroke(0);
    strokeWeight(2);
    noFill();
  
    // Define the dimensions of the pill shape
    let pillWidth = 500;
    let pillHeight = 100;
    let x = width / 2 - pillWidth / 2;  // x position
    let y = height / 2 - pillHeight / 2; // y position

    let pillCurveAmt =2;
  
    beginShape();
    // Start at the left-center of the pill
    vertex(x, y + pillHeight / 2);
    // Draw the top left curve
    quadraticVertex(x, y, x + pillHeight / pillCurveAmt, y);
    // Draw the top edge to the start of the top right curve
    vertex(x + pillWidth - pillHeight / 2, y);
    // Draw the top right curve
    quadraticVertex(x + pillWidth, y, x + pillWidth, y + pillHeight / pillCurveAmt);
    // Draw the right edge to the start of the bottom right curve
    vertex(x + pillWidth, y + pillHeight / 2);
    // Draw the bottom right curve
    quadraticVertex(x + pillWidth, y + pillHeight, x + pillWidth - pillHeight / pillCurveAmt, y + pillHeight);
    // Draw the bottom edge to the start of the bottom left curve
    vertex(x + pillHeight / 2, y + pillHeight);
    // Draw the bottom left curve
    quadraticVertex(x, y + pillHeight, x, y + pillHeight / pillCurveAmt);
    // Close the shape
    endShape(CLOSE);
  }
  