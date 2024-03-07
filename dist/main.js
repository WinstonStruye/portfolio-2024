var $dr2R5$p5 = require("p5");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
// import './libraries/p5.js';


let $e8d9df63381e2283$var$dotGrid = []; // Array to store dot positions and colors
let $e8d9df63381e2283$var$closestIndex = -1; // Store the index of the closest dot to the mouse
let $e8d9df63381e2283$var$closestDotIndexOnLoad;
let $e8d9df63381e2283$var$lines = [];
let $e8d9df63381e2283$var$singleLineDotIndices = [];
let $e8d9df63381e2283$var$colRowAmt = 12;
let $e8d9df63381e2283$var$defaultEllipseColor = 150;
let $e8d9df63381e2283$var$ellipseSize = 4;
let $e8d9df63381e2283$var$maxAmountOfLines = 10;
let $e8d9df63381e2283$var$lineSettings = {
    inside: 3,
    outside: 20,
    colors: [
        {
            name: "red",
            value: [
                255,
                0,
                0
            ]
        },
        {
            name: "green",
            value: [
                0,
                255,
                0
            ]
        },
        {
            name: "blue",
            value: [
                0,
                0,
                255
            ]
        }
    ],
    getRandomColor: function() {
        let randomIndex = Math.floor(Math.random() * this.colors.length);
        return this.colors[randomIndex].value;
    }
};
let $e8d9df63381e2283$var$colorSelected;
let $e8d9df63381e2283$var$bgColor = 249;
// let p; // p5 instance
let $e8d9df63381e2283$var$divWidth;
let $e8d9df63381e2283$var$timing = 500;
function $e8d9df63381e2283$export$de27182ff8187d6c(p) {
    let canvasDiv = p.select("#p5_canvas");
    let divWidth = canvasDiv.width;
    let canvas = p.createCanvas(divWidth, divWidth);
    canvas.parent("p5_canvas");
    $e8d9df63381e2283$export$55f55c0a729d55a5(p); // Initialize the grid positions
    p.noLoop(); // Only draw when necessary
// setInterval(() => {
//     handleMouseMovement(p);
// }, timing); // Call handleMouseMovement every 5 seconds
}
function $e8d9df63381e2283$export$e529deb2bfd496dc(p) {
    p.blendMode(p.BLEND); // Reset blend mode to default
    p.background($e8d9df63381e2283$var$bgColor); // Clear the background
    p.blendMode(p.DIFFERENCE); // Set blend mode to multiply
    $e8d9df63381e2283$export$27779f85c10ce689(p); // Draw the line between the dots
    p.blendMode(p.BLEND); // Reset blend mode to default
    $e8d9df63381e2283$export$20d2db9c68afeac(p); // Draw the grid of dots
}
function $e8d9df63381e2283$export$626d8ccdc48506d1(p) {
    // Get the start and end dots
    let dotPosition1 = $e8d9df63381e2283$var$singleLineDotIndices[0];
    let dotPosition2;
    let dotPosition3;
    if ($e8d9df63381e2283$var$singleLineDotIndices.length <= 1) {
        dotPosition2 = dotPosition1;
        dotPosition3 = dotPosition1;
    } else if ($e8d9df63381e2283$var$singleLineDotIndices.length <= 2) {
        dotPosition2 = $e8d9df63381e2283$var$singleLineDotIndices[$e8d9df63381e2283$var$singleLineDotIndices.length - 1];
        dotPosition3 = $e8d9df63381e2283$var$singleLineDotIndices[$e8d9df63381e2283$var$singleLineDotIndices.length - 1];
    } else {
        dotPosition2 = $e8d9df63381e2283$var$singleLineDotIndices[$e8d9df63381e2283$var$singleLineDotIndices.length - 2];
        dotPosition3 = $e8d9df63381e2283$var$singleLineDotIndices[$e8d9df63381e2283$var$singleLineDotIndices.length - 1];
    }
    // Create or update a line based on the positions of dotPosition1 and dotPosition2
    $e8d9df63381e2283$export$217a0444321fb1bf(p, dotPosition1, dotPosition2, dotPosition3);
}
function $e8d9df63381e2283$export$217a0444321fb1bf(p, dotPosition1, dotPosition2, dotPosition3) {
    // Check if dotPosition1 and dotPosition2 are on the same vertical or horizontal plane
    if (dotPosition1.x === dotPosition3.x || dotPosition1.y === dotPosition3.y) {
        // If there are no lines or the last line is not a lineStraight(or is a lineCurve), create a new lineStraight
        if ($e8d9df63381e2283$var$lines.length === 0 || !($e8d9df63381e2283$var$lines[$e8d9df63381e2283$var$lines.length - 1] instanceof $e8d9df63381e2283$export$ff69c39fcbb84b7e)) {
            // startNewLine = true;
            let newLine = new $e8d9df63381e2283$export$ff69c39fcbb84b7e(p, dotPosition1, dotPosition3, $e8d9df63381e2283$var$colorSelected, $e8d9df63381e2283$var$lineSettings.inside, $e8d9df63381e2283$var$lineSettings.outside);
            if ($e8d9df63381e2283$var$lines.length >= $e8d9df63381e2283$var$maxAmountOfLines) $e8d9df63381e2283$var$lines.shift(); // Remove the first line
            $e8d9df63381e2283$var$lines.push(newLine);
        } else {
            let newLine = new $e8d9df63381e2283$export$ff69c39fcbb84b7e(p, dotPosition1, dotPosition3, $e8d9df63381e2283$var$colorSelected, $e8d9df63381e2283$var$lineSettings.inside, $e8d9df63381e2283$var$lineSettings.outside);
            $e8d9df63381e2283$var$lines[$e8d9df63381e2283$var$lines.length - 1] = newLine;
        }
    } else {
        $e8d9df63381e2283$var$startNewLine = true;
        // Create a new line and add it to the array
        let newLine = new $e8d9df63381e2283$export$ff69c39fcbb84b7e(p, dotPosition2, dotPosition3, $e8d9df63381e2283$var$lineSettings.getRandomColor(), $e8d9df63381e2283$var$lineSettings.inside, $e8d9df63381e2283$var$lineSettings.outside);
        if ($e8d9df63381e2283$var$lines.length >= $e8d9df63381e2283$var$maxAmountOfLines) $e8d9df63381e2283$var$lines.shift(); // Remove the first line
        $e8d9df63381e2283$var$lines.push(newLine);
    }
}
function $e8d9df63381e2283$export$27779f85c10ce689(p) {
    // Draw all the lines in the array
    for (let line of $e8d9df63381e2283$var$lines)line.drawLine();
}
let $e8d9df63381e2283$var$lastClosestIndex = -1;
function $e8d9df63381e2283$export$f686b8b46f18e959(p) {
    let closestDist = Infinity;
    let closestIndex = -1;
    for(let i = 0; i < $e8d9df63381e2283$var$dotGrid.length; i++){
        let dot = $e8d9df63381e2283$var$dotGrid[i];
        let d = p.dist(p.mouseX, p.mouseY, dot.x, dot.y);
        if (d < closestDist) {
            closestDist = d;
            closestIndex = i;
        }
    }
    // If the closest dot has changed, add it to the singleLineDotIndices
    if (closestIndex !== $e8d9df63381e2283$var$lastClosestIndex) {
        $e8d9df63381e2283$var$singleLineDotIndices.push($e8d9df63381e2283$var$dotGrid[closestIndex]);
        $e8d9df63381e2283$var$lastClosestIndex = closestIndex;
    }
    return closestIndex;
}
let $e8d9df63381e2283$var$startNewLine = false;
let $e8d9df63381e2283$var$mouseHasMoved = false;
function $e8d9df63381e2283$export$e457164953da76db(p) {
    // If the mouse has not moved before, find the closest dot
    if (!$e8d9df63381e2283$var$mouseHasMoved || $e8d9df63381e2283$var$startNewLine) {
        let startingIndex = $e8d9df63381e2283$export$f686b8b46f18e959(p);
        $e8d9df63381e2283$var$singleLineDotIndices[0] = $e8d9df63381e2283$var$dotGrid[startingIndex];
        $e8d9df63381e2283$var$colorSelected = $e8d9df63381e2283$var$lineSettings.getRandomColor();
        $e8d9df63381e2283$var$mouseHasMoved = true;
        $e8d9df63381e2283$var$startNewLine = false;
    }
    $e8d9df63381e2283$export$626d8ccdc48506d1(p);
    $e8d9df63381e2283$export$f686b8b46f18e959(p);
    p.redraw(); // Redraw the canvas with the new line
}
function $e8d9df63381e2283$export$ea6af206bb9b0f02(p) {
    let canvasDiv = p.select("#p5_canvas");
    let divWidth = canvasDiv.width;
    p.resizeCanvas(divWidth, divWidth);
    $e8d9df63381e2283$export$55f55c0a729d55a5(p); // Reinitialize the grid for the new size
    $e8d9df63381e2283$export$626d8ccdc48506d1(p);
    p.redraw(); // Redraw since we are not looping
}
function $e8d9df63381e2283$export$55f55c0a729d55a5(p) {
    $e8d9df63381e2283$var$dotGrid = []; // Clear the previous grid
    let spacingX = p.width / $e8d9df63381e2283$var$colRowAmt;
    let spacingY = 160;
    for(let i = 0; i < $e8d9df63381e2283$var$colRowAmt; i++)for(let j = 0; j < $e8d9df63381e2283$var$colRowAmt; j++){
        let x = i * spacingX + spacingX / 2;
        let y = j * spacingY + spacingY;
        $e8d9df63381e2283$var$dotGrid.push({
            x: x,
            y: y,
            color: $e8d9df63381e2283$var$defaultEllipseColor
        });
    }
}
function $e8d9df63381e2283$export$20d2db9c68afeac(p) {
    for(let i = 0; i < $e8d9df63381e2283$var$dotGrid.length; i++){
        let dot = $e8d9df63381e2283$var$dotGrid[i];
        p.fill(dot.color); // Set the fill color for each dot
        p.noStroke(); // No outline for the dots
        p.ellipse(dot.x, dot.y, $e8d9df63381e2283$var$ellipseSize, $e8d9df63381e2283$var$ellipseSize); // Draw each dot
    }
}
class $e8d9df63381e2283$export$ff69c39fcbb84b7e {
    constructor(p, startDot, endDot, color, lineInside, lineOutside){
        this.p = p;
        this.startDot = startDot;
        this.endDot = endDot;
        this.color = color;
        this.lineInside = lineInside;
        this.lineOutside = lineOutside;
        this.d = lineInside;
        this.calculateSlopes = this.calculateSlopes.bind(this);
        this.calculateVertexes = this.calculateVertexes.bind(this);
    }
    calculateSlopes() {
        let angle = this.p.atan2(this.endDot.y - this.startDot.y, this.endDot.x - this.startDot.x);
        let slope, perpSlope;
        if (angle === this.p.PI / 2 || angle === -this.p.PI / 2) {
            slope = Infinity; // or NaN, depending on your use case
            perpSlope = 0;
        } else {
            slope = this.p.tan(angle);
            perpSlope = -1 / slope;
        }
        return {
            perpSlope: perpSlope,
            angle: angle
        };
    }
    calculateVertexes() {
        let { perpSlope: perpSlope, angle: angle } = this.calculateSlopes();
        let dMultiplier = 1 + 1 / 3;
        let deltaX = this.d * dMultiplier * this.p.cos(angle);
        let deltaY = this.d * dMultiplier * this.p.sin(angle);
        let endAnchor1X, endAnchor1Y, endAnchor2X, endAnchor2Y, startAnchor1X, startAnchor1Y, startAnchor2X, startAnchor2Y;
        if (perpSlope === 0) {
            // original line is vertical
            endAnchor1X = this.endDot.x + this.d;
            endAnchor1Y = this.endDot.y;
            endAnchor2X = this.endDot.x - this.d;
            endAnchor2Y = this.endDot.y;
            startAnchor1X = this.startDot.x - this.d;
            startAnchor1Y = this.startDot.y;
            startAnchor2X = this.startDot.x + this.d;
            startAnchor2Y = this.startDot.y;
        } else if (this.startDot.y === this.endDot.y) {
            // original line is horizontal
            endAnchor1X = this.endDot.x;
            endAnchor1Y = this.endDot.y + this.d;
            endAnchor2X = this.endDot.x;
            endAnchor2Y = this.endDot.y - this.d;
            startAnchor1X = this.startDot.x;
            startAnchor1Y = this.startDot.y - this.d;
            startAnchor2X = this.startDot.x;
            startAnchor2Y = this.startDot.y + this.d;
        } else {
            // original line is not vertical or horizontal
            // this is what is getting called instead of the stuff below when moving right to left
            endAnchor1X = this.endDot.x + this.d / Math.sqrt(1 + perpSlope * perpSlope);
            endAnchor1Y = this.endDot.y + perpSlope * (endAnchor1X - this.endDot.x);
            endAnchor2X = this.endDot.x - this.d / Math.sqrt(1 + perpSlope * perpSlope);
            endAnchor2Y = this.endDot.y + perpSlope * (endAnchor2X - this.endDot.x); // Use endAnchor2X here
            startAnchor1X = this.startDot.x - this.d / Math.sqrt(1 + perpSlope * perpSlope);
            startAnchor1Y = this.startDot.y + perpSlope * (startAnchor1X - this.startDot.x);
            startAnchor2X = this.startDot.x + this.d / Math.sqrt(1 + perpSlope * perpSlope);
            startAnchor2Y = this.startDot.y + perpSlope * (startAnchor2X - this.startDot.x); // Use startAnchor2X here
        }
        let endControl1X = endAnchor1X + deltaX;
        let endControl1Y = endAnchor1Y + deltaY;
        let endControl2X = endAnchor2X + deltaX;
        let endControl2Y = endAnchor2Y + deltaY;
        let startControl1X = startAnchor1X - deltaX;
        let startControl1Y = startAnchor1Y - deltaY;
        let startControl2X = startAnchor2X - deltaX;
        let startControl2Y = startAnchor2Y - deltaY;
        return {
            startControl2Y: startControl2Y,
            startControl2X: startControl2X,
            startAnchor2Y: startAnchor2Y,
            startAnchor2X: startAnchor2X,
            startControl1X: startControl1X,
            startControl1Y: startControl1Y,
            startAnchor1X: startAnchor1X,
            startAnchor1Y: startAnchor1Y,
            endAnchor1X: endAnchor1X,
            endAnchor1Y: endAnchor1Y,
            endControl1X: endControl1X,
            endControl1Y: endControl1Y,
            endAnchor2X: endAnchor2X,
            endAnchor2Y: endAnchor2Y,
            endControl2X: endControl2X,
            endControl2Y: endControl2Y
        };
    }
    drawLine() {
        let { startControl2Y: startControl2Y, startControl2X: startControl2X, startAnchor2Y: startAnchor2Y, startAnchor2X: startAnchor2X, startControl1X: startControl1X, startControl1Y: startControl1Y, startAnchor1X: startAnchor1X, startAnchor1Y: startAnchor1Y, endAnchor1X: endAnchor1X, endAnchor1Y: endAnchor1Y, endControl1X: endControl1X, endControl1Y: endControl1Y, endAnchor2X: endAnchor2X, endAnchor2Y: endAnchor2Y, endControl2X: endControl2X, endControl2Y: endControl2Y } = this.calculateVertexes();
        // Draw the line
        this.p.noStroke();
        this.p.strokeWeight(this.lineOutside);
        this.p.fill(...this.color);
        this.p.beginShape();
        this.p.vertex(endAnchor1X, endAnchor1Y);
        this.p.bezierVertex(endControl1X, endControl1Y, endControl2X, endControl2Y, endAnchor2X, endAnchor2Y);
        this.p.vertex(startAnchor1X, startAnchor1Y);
        this.p.bezierVertex(startControl1X, startControl1Y, startControl2X, startControl2Y, startAnchor2X, startAnchor2Y);
        this.p.endShape(this.p.CLOSE);
    }
}


new (0, ($parcel$interopDefault($dr2R5$p5)))((p)=>{
    p.setup = ()=>{
        (0, $e8d9df63381e2283$export$de27182ff8187d6c)(p);
    };
    p.draw = ()=>{
        (0, $e8d9df63381e2283$export$e529deb2bfd496dc)(p);
    };
    p.drawGrid = ()=>{
        (0, $e8d9df63381e2283$export$20d2db9c68afeac)(p);
    };
    p.windowResized = ()=>{
        (0, $e8d9df63381e2283$export$ea6af206bb9b0f02)(p);
    };
    p.initializeGrid = ()=>{
        (0, $e8d9df63381e2283$export$55f55c0a729d55a5)(p);
    };
    p.mouseMoved = ()=>{
        (0, $e8d9df63381e2283$export$e457164953da76db)(p);
    };
    p.createDotPositions = ()=>{
        (0, $e8d9df63381e2283$export$626d8ccdc48506d1)(p);
    };
    p.findClosestDotToMouse = ()=>{
        (0, $e8d9df63381e2283$export$f686b8b46f18e959)(p);
    };
    p.createOrUpdateLine = ()=>{
        (0, $e8d9df63381e2283$export$217a0444321fb1bf)(p);
    };
    p.drawLinesArray = ()=>{
        (0, $e8d9df63381e2283$export$27779f85c10ce689)(p);
    };
});


//# sourceMappingURL=main.js.map
