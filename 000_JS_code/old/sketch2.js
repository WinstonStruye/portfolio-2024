let dotGrid = []; // Array to store dot positions and colors
let colRowAmt = 6;
let defaultEllipseColor = 1;
let ellipseSize = 3;
let closestIndex = -1; // Store the index of the closest dot to the mouse
let lineDotIndices = {
  start: null,
  end1: null,
  end2: null,
  end3: null,
}; // Store the indices of the dots currently forming the line

let drawLine = {
  
}

const lineConfig = {
  colorBack: [255, 0, 0],
  weight1: 20,
  colorFront: 255,
  weight2: 15,
};
const lineConfig2 = {
  colorBack: [0, 255, 0],
};
const lineConfig3 = {
  colorBack: [0, 0, 255],
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

  // Update the line only if the closest dot has changed
  if (newClosestIndex !== closestIndex) {
    closestIndex = newClosestIndex;
    lineDotIndices.start = closestIndex;

    // Randomly select three different dots, ensuring they are distinct
    lineDotIndices.end1 = selectRandomDotIndex(closestIndex);
    lineDotIndices.end2 = selectRandomDotIndex(
      closestIndex,
      lineDotIndices.end
    );
    lineDotIndices.end3 = selectRandomDotIndex(
      closestIndex,
      lineDotIndices.end,
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

    stroke(lineConfig.colorBack); // Set line color (black in this case)
    strokeWeight(lineConfig.weight1); // Set line thickness
    line(dot1.x, dot1.y, dot2.x, dot2.y); // Draw the line
    stroke(lineConfig.colorFront); // Set line color (black in this case)
    strokeWeight(lineConfig.weight2); // Set line thickness
    line(dot1.x, dot1.y, dot2.x, dot2.y); // Draw the line

    stroke(lineConfig2.colorBack); // Set line color (black in this case)
    strokeWeight(lineConfig.weight1); // Set line thickness
    line(dot2.x, dot2.y, dot3.x, dot3.y); // Draw the line
    stroke(lineConfig.colorFront); // Set line color (black in this case)
    strokeWeight(lineConfig.weight2); // Set line thickness
    line(dot2.x, dot2.y, dot3.x, dot3.y); // Draw the line

    stroke(lineConfig3.colorBack); // Set line color (black in this case)
    strokeWeight(lineConfig.weight1); // Set line thickness
    line(dot3.x, dot3.y, dot4.x, dot4.y); // Draw the line
    stroke(lineConfig.colorFront); // Set line color (black in this case)
    strokeWeight(lineConfig.weight2); // Set line thickness
    line(dot3.x, dot3.y, dot4.x, dot4.y); // Draw the line
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
