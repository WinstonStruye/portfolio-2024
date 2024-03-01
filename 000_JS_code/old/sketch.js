let dotGrid = []; // Array to store dot positions and colors
let colRowAmt = 10;
let defaultEllipseColor = 1;
let ellipseSize = 3;
let closestIndex = -1; // Store the index of the closest dot to the mouse
let lineDotIndices = { 
    start: null, 
    end1: null,
    end2: null,
    end3: null 
  }; // Store the indices of the dots currently forming the line

const lineConfig = {
  color1: 0, // Color of the line (white in this case, use an array for RGB color e.g., [255, 0, 0] for red)
  weight1: 60,  // Thickness of the line

  color2: 255, // Color of the line (white in this case, use an array for RGB color e.g., [255, 0, 0] for red)
  weight2: 30  // Thickness of the line


};

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeGrid(); // Initialize the grid positions
  noLoop(); // Only draw when necessary
}

function draw() {
  background(255); // Clear the background

  drawLineBetweenDots(); // Draw the line between the dots
  drawGrid(); // Draw the grid of dots
}

function initializeGrid() {
  dotGrid = []; // Clear the previous grid
  let spacingX = width / colRowAmt;
  let spacingY = height / colRowAmt;

  for (let i = 0; i < colRowAmt; i++) {
    for (let j = 0; j < colRowAmt; j++) {
      let x = i * spacingX + spacingX / 2;
      let y = j * spacingY + spacingY / 2;
      dotGrid.push({ x: x, y: y, color: defaultEllipseColor });
    }
  }
}

function drawGrid() {
  for (let i = 0; i < dotGrid.length; i++) {
    let dot = dotGrid[i];
    fill(dot.color); // Set the fill color for each dot
    noStroke(); // No outline for the dots
    ellipse(dot.x, dot.y, ellipseSize, ellipseSize); // Draw each dot
  }
}

function updateLine() {
  // Find the dot closest to the mouse
  let newClosestIndex = findClosestDotToMouse();
  
  // If the closest dot is different from the previous one, update the line
  if (newClosestIndex !== closestIndex) {
    closestIndex = newClosestIndex;
    // Choose a random dot to form the line, different from the closest dot
    let randomIndex;
    do {
      randomIndex = floor(random(dotGrid.length));
    } while (closestIndex === randomIndex);

    // Update the indices of the dots forming the line
    lineDotIndices.start = closestIndex;
    lineDotIndices.end1 = randomIndex;
  }
}

function drawLineBetweenDots() {
  // If we have two dots to connect
  if (lineDotIndices.start !== null && lineDotIndices.end1 !== null) {
    let dot1 = dotGrid[lineDotIndices.start];
    let dot2 = dotGrid[lineDotIndices.end1];

    stroke(lineConfig.color1); // Set line color (black in this case)
    strokeWeight(lineConfig.weight1); // Set line thickness
    line(dot1.x, dot1.y, dot2.x, dot2.y); // Draw the line
    stroke(lineConfig.color2); // Set line color (black in this case)
    strokeWeight(lineConfig.weight2); // Set line thickness
    line(dot1.x, dot1.y, dot2.x, dot2.y); // Draw the line

  }
}

function findClosestDotToMouse() {
  let closestDist = Infinity;
  let closestIndex = -1;

  for (let i = 0; i < dotGrid.length; i++) {
    let dot = dotGrid[i];
    let d = dist(mouseX, mouseY, dot.x, dot.y);
    if (d < closestDist) {
      closestDist = d;
      closestIndex = i;
    }
  }

  return closestIndex;
}

function mouseMoved() {
  updateLine(); // Check if the line needs to be updated
  redraw(); // Redraw the canvas with the new line
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeGrid(); // Reinitialize the grid for the new size
  updateLine(); // Update the line based on the new grid
  redraw(); // Redraw since we are not looping
}
