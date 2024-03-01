let dotGrid = []; // Array to store dot positions and colors
let closestIndex = -1; // Store the index of the closest dot to the mouse
let closestDotIndexOnLoad;
let lineDotIndices = {
  start: null,
  end: null,
  floating: null,
};

let line1color = [255, 0, 0];
let lineStraightColor = [0, 255, 0];
let lineCurveColor = [0, 0, 255];

let colRowAmt = 6;
let defaultEllipseColor = 1;
let ellipseSize = 5;

let lineConfig = {
  inside: 2,
  outside: 50,
  insideColor: 255,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeGrid(); // Initialize the grid positions
  noLoop(); // Only draw when necessary
}

function draw() {
  blendMode(BLEND); // Reset blend mode to default
  background(255); // Clear the background
  blendMode(DIFFERENCE); // Set blend mode to multiply
  drawLineBetweenDots(); // Draw the line between the dots
  blendMode(BLEND); // Reset blend mode to default
  drawGrid(); // Draw the grid of dots
}

let lines = [];

function updateLine() {
  // Get the start and end dots
  let dot1 = dotGrid[lineDotIndices.start];
  let dot2 = dotGrid[lineDotIndices.end];
  let dot3 = dotGrid[lineDotIndices.floating];

  // Create or update a line based on the positions of dot1 and dot2
  createOrUpdateLine(dot1, dot2);
}

function createOrUpdateLine(dot1, dot2) {
  // Check if dot1 and dot2 are on the same vertical or horizontal plane
  if (dot1.x === dot2.x || dot1.y === dot2.y) {
  
    // If there are no lines or the last line is not a lineStraight, create a new lineStraight
    if (lines.length === 0 || !(lines[lines.length - 1] instanceof LineStraight)) {
      let newLine = new LineStraight(
        dot1.x,
        dot1.y,
        dot2.x,
        dot2.y,
        lineStraightColor,
        lineConfig.inside,
        lineConfig.outside
      );

      lines.push(newLine);
      startNewLine = true;
    } else {
      // Update the dot2.x and dot2.y properties of the last lineStraight in the array
      let lastLine = lines[lines.length - 1];
      print(lastLine);
      let newLine = new LineStraight(
        dot1.x,
        dot1.y,
        dot2.x,
        dot2.y,
        lineStraightColor,
        lineConfig.inside,
        lineConfig.outside
      );
      lines[lines.length - 1] = newLine;
    } 
  } else {
    // Create a new line and add it to the array
    let newLine = new LineCurve(
      dot2.x,
      dot2.y,
      dot3.x,
      dot3.y,
      line1color,
      lineConfig.inside,
      lineConfig.outside,
      lineConfig.insideColor
    );
    lines.push(newLine);
    startNewLine = true;
  }
}

function drawLineBetweenDots() {
  // Draw all the lines in the array
  for (let line of lines) {
    line.drawLine();
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
 
let startNewLine = false;
let mouseHasMoved = false;
function mouseMoved() {
  // If the mouse has not moved before, find the closest dot
  if (!mouseHasMoved || startNewLine) {
    lineDotIndices.start = findClosestDotToMouse();
    mouseHasMoved = true;
    startNewLine = false;
  }
    // Define dot2 as the closest dot to the mouse
  lineDotIndices.end = findClosestDotToMouse();
  lineDotIndices.flaoting = findClosestDotToMouse();
  updateLine(); // Check if the line needs to be updated
  redraw(); // Redraw the canvas with the new line
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeGrid(); // Reinitialize the grid for the new size
  updateLine(); // Update the line based on the new grid
  redraw(); // Redraw since we are not looping
}
