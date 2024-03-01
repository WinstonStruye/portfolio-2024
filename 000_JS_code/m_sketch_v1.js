

import p5 from 'p5';

p.print('now using github');
let dotGrid = []; // Array to store dot positions and colors
let closestIndex = -1; // Store the index of the closest dot to the mouse
let closestDotIndexOnLoad;
let lines = [];
let singleLineDotIndices = [];

let colRowAmt = 12;
let defaultEllipseColor = 150;
let ellipseSize = 4;

let maxAmountOfLines = 10;

let lineSettings = {
    inside: 3,
    outside: 20,
    colors: [
        { name: "red", value: [255, 0, 0] },
        { name: "green", value: [0, 255, 0] },
        { name: "blue", value: [0, 0, 255] },
    ],
    getRandomColor: function () {
        let randomIndex = Math.floor(Math.random() * this.colors.length);
        return this.colors[randomIndex].value;
    },
};

let colorSelected;
let bgColor = 249;

let p; // p5 instance
let divWidth;
let timing = 500;

export function setup(p) {
    let canvasDiv = p.select('#p5_canvas');


    let divWidth = canvasDiv.width;

    let canvas = p.createCanvas(divWidth, divWidth);
    canvas.parent("p5_canvas");
    initializeGrid(p); // Initialize the grid positions
    p.noLoop(); // Only draw when necessary


    // setInterval(() => {
    //     handleMouseMovement(p);
    // }, timing); // Call handleMouseMovement every 5 seconds

}

export function draw(p) {
    p.blendMode(p.BLEND); // Reset blend mode to default
    p.background(bgColor); // Clear the background

    p.blendMode(p.DIFFERENCE); // Set blend mode to multiply
    drawLinesArray(p); // Draw the line between the dots
    
    p.blendMode(p.BLEND); // Reset blend mode to default
    drawGrid(p); // Draw the grid of dots
}

export function createDotPositions(p) {
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
    createOrUpdateLine(p, dotPosition1, dotPosition2, dotPosition3);
}

export function createOrUpdateLine(p, dotPosition1, dotPosition2, dotPosition3) {

    // Check if dotPosition1 and dotPosition2 are on the same vertical or horizontal plane
    if (dotPosition1.x === dotPosition3.x || dotPosition1.y === dotPosition3.y) {
        // If there are no lines or the last line is not a lineStraight(or is a lineCurve), create a new lineStraight
        if (
            lines.length === 0 ||
            !(lines[lines.length - 1] instanceof ConnectorLine)
        ) {
            // startNewLine = true;
            let newLine = new ConnectorLine(
                p,
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
            let newLine = new ConnectorLine(
                p,
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
        let newLine = new ConnectorLine(
            p,
            dotPosition2,
            dotPosition3,
            lineSettings.getRandomColor(),
            lineSettings.inside,
            lineSettings.outside
        );
        if (lines.length >= maxAmountOfLines) {
            lines.shift(); // Remove the first line
        }

        lines.push(newLine);
    }
}

export function drawLinesArray(p) {

    // Draw all the lines in the array
    for (let line of lines) {
        line.drawLine();
    }

}

let lastClosestIndex = -1;

export function findClosestDotToMouse(p) {
    let closestDist = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < dotGrid.length; i++) {
        let dot = dotGrid[i];
        let d = p.dist(p.mouseX, p.mouseY, dot.x, dot.y);
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
export function mouseMoved(p) {

    // If the mouse has not moved before, find the closest dot
    if (!mouseHasMoved || startNewLine) {
        let startingIndex = findClosestDotToMouse(p);
        singleLineDotIndices[0] = dotGrid[startingIndex];
        colorSelected = lineSettings.getRandomColor();
        mouseHasMoved = true;
        startNewLine = false;
    }
    createDotPositions(p);
    findClosestDotToMouse(p);
    p.redraw(); // Redraw the canvas with the new line
}

// export function handleMouseMovement(p) {
//     console.log('handleMouseMovement',p);
//     // If the mouse has not moved before, find the closest dot
//     if (!mouseHasMoved || startNewLine) {
//         let startingIndex = findClosestDotToMouse(p);
//         singleLineDotIndices[0] = dotGrid[startingIndex];
//         colorSelected = lineSettings.getRandomColor();
//         mouseHasMoved = true;
//         startNewLine = false;
//     }
//     createDotPositions(p);
//     findClosestDotToMouse(p);
//     p.redraw(); // Redraw the canvas with the new line
// }

export function windowResized(p) {
    let canvasDiv = p.select('#p5_canvas');
    let divWidth = canvasDiv.width;

    p.resizeCanvas(divWidth, divWidth);
    initializeGrid(p); // Reinitialize the grid for the new size
    createDotPositions(p);
    p.redraw(); // Redraw since we are not looping
}

export function initializeGrid(p) {

    dotGrid = []; // Clear the previous grid
    let spacingX = p.width / colRowAmt;
    let spacingY = 160;

    for (let i = 0; i < colRowAmt; i++) {
        for (let j = 0; j < colRowAmt; j++) {
            let x = i * spacingX + spacingX / 2;
            let y = j * spacingY + spacingY;
            dotGrid.push({ x: x, y: y, color: defaultEllipseColor });
        }
    }
}

export function drawGrid(p) {
    for (let i = 0; i < dotGrid.length; i++) {
        let dot = dotGrid[i];
        p.fill(dot.color); // Set the fill color for each dot
        p.noStroke(); // No outline for the dots
        p.ellipse(dot.x, dot.y, ellipseSize, ellipseSize); // Draw each dot
    }
}


export class ConnectorLine {
    constructor(p, startDot, endDot, color, lineInside, lineOutside) {
        this.p = p;
        this.startDot = startDot;
        this.endDot = endDot;
        this.color = color;
        this.lineInside = lineInside;
        this.lineOutside = lineOutside;
        this.d = lineInside;
        this.calculateSlopes = this.calculateSlopes.bind(this);
        this.calculateVertexes = this.calculateVertexes.bind(this);
 
    };
    


    calculateSlopes() {


        let angle = this.p.atan2 (
            this.endDot.y - this.startDot.y,
            this.endDot.x - this.startDot.x
        );
        let slope, perpSlope;
        if (angle === this.p.PI / 2 || angle === -this.p.PI / 2) {
            slope = Infinity; // or NaN, depending on your use case
            perpSlope = 0;
        } else {
            slope = this.p.tan(angle);
            perpSlope = -1 / slope;
        }
        return { perpSlope, angle };
    }

    calculateVertexes() {
        let { perpSlope, angle } =this.calculateSlopes();

        let dMultiplier = 1 + 1 / 3;
        let deltaX = this.d * dMultiplier * this.p.cos(angle);
        let deltaY = this.d * dMultiplier * this.p.sin(angle);

        let endAnchor1X,
            endAnchor1Y,
            endAnchor2X,
            endAnchor2Y,
            startAnchor1X,
            startAnchor1Y,
            startAnchor2X,
            startAnchor2Y;

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
            endAnchor1X =
                this.endDot.x + this.d / Math.sqrt(1 + perpSlope * perpSlope);
            endAnchor1Y = this.endDot.y + perpSlope * (endAnchor1X - this.endDot.x);
            endAnchor2X = this.endDot.x - this.d / Math.sqrt(1 + perpSlope * perpSlope);
            endAnchor2Y = this.endDot.y + perpSlope * (endAnchor2X - this.endDot.x); // Use endAnchor2X here

            startAnchor1X =
                this.startDot.x - this.d / Math.sqrt(1 + perpSlope * perpSlope);
            startAnchor1Y =
                this.startDot.y + perpSlope * (startAnchor1X - this.startDot.x);
            startAnchor2X =
                this.startDot.x + this.d / Math.sqrt(1 + perpSlope * perpSlope);
            startAnchor2Y =
                this.startDot.y + perpSlope * (startAnchor2X - this.startDot.x); // Use startAnchor2X here
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
            startControl2Y,
            startControl2X,
            startAnchor2Y,
            startAnchor2X,
            startControl1X,
            startControl1Y,
            startAnchor1X,
            startAnchor1Y,
            endAnchor1X,
            endAnchor1Y,
            endControl1X,
            endControl1Y,
            endAnchor2X,
            endAnchor2Y,
            endControl2X,
            endControl2Y,
        };
    }

    drawLine() {
        let {
            startControl2Y,
            startControl2X,
            startAnchor2Y,
            startAnchor2X,
            startControl1X,
            startControl1Y,
            startAnchor1X,
            startAnchor1Y,
            endAnchor1X,
            endAnchor1Y,
            endControl1X,
            endControl1Y,
            endAnchor2X,
            endAnchor2Y,
            endControl2X,
            endControl2Y,
        } = this.calculateVertexes();

        // Draw the line
        this.p.noStroke();
        this.p.strokeWeight(this.lineOutside);
        this.p.fill(...this.color);
        this.p.beginShape();
        this.p.vertex(endAnchor1X, endAnchor1Y);
        this.p.bezierVertex(
            endControl1X,
            endControl1Y,
            endControl2X,
            endControl2Y,
            endAnchor2X,
            endAnchor2Y
        );
        this.p.vertex(startAnchor1X, startAnchor1Y);
        this.p.bezierVertex(
            startControl1X,
            startControl1Y,
            startControl2X,
            startControl2Y,
            startAnchor2X,
            startAnchor2Y
        );
        this.p.endShape(this.p.CLOSE);
    }
}
