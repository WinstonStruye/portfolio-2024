
console.log("the code is connecting at the start");
print("p5 is working");
console.log("p5 is NOT working"); 

let dotGrid = []; // Array to store dot positions and colors
let closestIndex = -1; // Store the index of the closest dot to the mouse
let closestDotIndexOnLoad;

let lines = [];
let singleLineDotIndices = [];

let colRowAmt = 6;
let defaultEllipseColor = 1;
let ellipseSize = 5;

let maxAmountOfLines = 20;

let lineSettings = {
  inside: 20,
  outside: 20,
  colors: [
    {name: 'red', value: [255, 0, 0]},
    {name: 'green', value: [0, 255, 0]},
    {name: 'blue', value: [0, 0, 255]},
  ],
  getRandomColor: function() {
    let randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex].value;
  }
};

let colorSelected;
let bgColor = 249;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5_canvas');
  print("canvas", canvas);
  initializeGrid(); // Initialize the grid positions
  noLoop(); // Only draw when necessary

}



function draw() {

  blendMode(BLEND); // Reset blend mode to default
  background(bgColor); // Clear the background
  // blendMode(DIFFERENCE); // Set blend mode to multiply
  drawLinesArray(); // Draw the line between the dots
  blendMode(BLEND); // Reset blend mode to default
  drawGrid(); // Draw the grid of dots



}


function createDotPositions() {
  // Get the start and end dots
  let dotPosition1 = singleLineDotIndices[0];
  let dotPosition2;
  let dotPosition3;
  if (singleLineDotIndices.length <= 1) {
    dotPosition2 = dotPosition1;
    dotPosition3 = dotPosition1;
    } else if (singleLineDotIndices.length <= 2) {
        dotPosition2 = singleLineDotIndices[singleLineDotIndices.length - 1];
        dotPosition3 = singleLineDotIndices[singleLineDotIndices.length - 1];
    } else {  
        dotPosition2 = singleLineDotIndices[singleLineDotIndices.length - 2];
        dotPosition3 = singleLineDotIndices[singleLineDotIndices.length - 1];
    }
  // Create or update a line based on the positions of dotPosition1 and dotPosition2
  createOrUpdateLine(dotPosition1, dotPosition2, dotPosition3);
}

function createOrUpdateLine(dotPosition1, dotPosition2, dotPosition3) {
  // Check if dotPosition1 and dotPosition2 are on the same vertical or horizontal plane
  if (dotPosition1.x === dotPosition3.x || dotPosition1.y === dotPosition3.y) {
    // If there are no lines or the last line is not a lineStraight(or is a lineCurve), create a new lineStraight
    if (lines.length === 0 || !(lines[lines.length - 1] instanceof LineStraight)) {
      startNewLine = true;
      
      let newLine = new LineStraight(
        dotPosition1,
        dotPosition3,
        colorSelected,
        lineSettings.inside,
        lineSettings.outside
      );
      
      if (lines.length >= maxAmountOfLines) {
        lines.shift(); // Remove the first line
      }
      lines.push(newLine);

    } else {
      let newLine = new LineStraight(
        dotPosition1,
        dotPosition3,
        colorSelected,
        lineSettings.inside,
        lineSettings.outside
      );
      lines[lines.length - 1] = newLine;

    } 
  } else {
    startNewLine = true;

    // Create a new line and add it to the array
    let newLine = new LineCurve(
      dotPosition2,
      dotPosition3,
      lineSettings.getRandomColor(),
      lineSettings.inside,
      lineSettings.outside,
    );
    if (lines.length >= maxAmountOfLines) {
      lines.shift(); // Remove the first line
    }
 

    lines.push(newLine);

  }
}

function drawLinesArray() {
  // Draw all the lines in the array
  for (let line of lines) {
    line.drawLine();
  }
}

let lastClosestIndex = -1;

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

  // If the closest dot has changed, add it to the singleLineDotIndices
  if (closestIndex !== lastClosestIndex) {
    singleLineDotIndices.push(dotGrid[closestIndex]);
    lastClosestIndex = closestIndex;
  }
  
  return closestIndex;
}
 
let startNewLine = false;
let mouseHasMoved = false;
function mouseMoved() {
  // If the mouse has not moved before, find the closest dot
  if (!mouseHasMoved || startNewLine) {
    let startingIndex = findClosestDotToMouse();
    singleLineDotIndices[0] = dotGrid[startingIndex];
    colorSelected = lineSettings.getRandomColor();
    mouseHasMoved = true;
    startNewLine = false;
  }
  //   // Define dotPosition2 as the closest dot to the mouse
  // lineDotIndices.end = findClosestDotToMouse();
  // lineDotIndices.floating = findClosestDotToMouse();
createDotPositions(); 
  findClosestDotToMouse();
  redraw(); // Redraw the canvas with the new line
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeGrid(); // Reinitialize the grid for the new size
  createDotPositions(); 
  redraw(); // Redraw since we are not looping
}


