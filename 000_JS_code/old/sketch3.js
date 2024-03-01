let dotGrid = []; // Array to store dot positions and colors
let closestIndex = -1; // Store the index of the closest dot to the mouse
let lineDotIndices = {
  start: null,
  end1: null,
  end2: null,
  end3: null,
}; // Store the indices of the dots currently forming the line
let line1;
let line2;
let line3;

let line1color = [255, 0, 0];
let line2color = [0, 255, 0];
let line3color = [0, 0, 255];

let colRowAmt = 6;
let defaultEllipseColor = 1;
let ellipseSize = 16;

let lineConfig = {
  inside: 15,
  outside: 60,
  insideColor: 255
}



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

  // Update the line only if the closest dot has changed
  if (newClosestIndex !== closestIndex) {
    closestIndex = newClosestIndex;
    lineDotIndices.start = closestIndex;

    // Randomly select three different dots, ensuring they are distinct
    lineDotIndices.end1 = selectRandomDotIndex(closestIndex);
    lineDotIndices.end2 = selectRandomDotIndex(
      closestIndex,
      lineDotIndices.end1
    );
    lineDotIndices.end3 = selectRandomDotIndex(
      closestIndex,
      lineDotIndices.end1,
      lineDotIndices.end2
    );
  }
}

function selectRandomDotIndex(...excludedIndices) {
  let randomIndex;
  do {
    randomIndex = floor(random(dotGrid.length));
  } while (excludedIndices.includes(randomIndex));
  return randomIndex;
}

function drawLineBetweenDots() {
  // If we have two dots to connect
  if (lineDotIndices.start !== null && lineDotIndices.end1 !== null) {
    let dot1 = dotGrid[lineDotIndices.start];
    let dot2 = dotGrid[lineDotIndices.end1];
    let dot3 = dotGrid[lineDotIndices.end2];
    let dot4 = dotGrid[lineDotIndices.end3];

    let line1 = new ConnectorLine(dot1.x, dot1.y, dot2.x, dot2.y, line1color, lineConfig.inside, lineConfig.outside, lineConfig.insideColor);
    let line2 = new ConnectorLine(dot2.x, dot2.y, dot3.x, dot3.y, line2color, lineConfig.inside, lineConfig.outside, lineConfig.insideColor);
    let line3 = new ConnectorLine(dot3.x, dot3.y, dot4.x, dot4.y, line3color, lineConfig.inside, lineConfig.outside, lineConfig.insideColor);


    line1.drawLine ();
    line2.drawLine ();
    line3.drawLine ();
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

class ConnectorLine {
  constructor(startX, startY, endX, endY, color, lineInside, lineOutside, insideColor) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.insideColor = insideColor;
  }

  drawLine() {
    strokeWeight(this.lineOutside);
    stroke(this.color);
    line(this.startX, this.startY, this.endX, this.endY); // Draw the line

    strokeWeight(this.lineInside);
    stroke(this.insideColor);
    line(this.startX, this.startY, this.endX, this.endY); // Draw the line
  }
}
