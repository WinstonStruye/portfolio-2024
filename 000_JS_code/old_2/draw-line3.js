class ConnectorLine {
  constructor(
    startDot,
    endDot,
    color,
    lineInside,
    lineOutside,
  ) {
    this.startDot = startDot;
    this.endDot = endDot;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.d = lineInside;
  }


  calculateSlopes() {
    let angle = atan2(this.endDot.y - this.startDot.y, this.endDot.x - this.startDot.x);
    let slope, perpSlope;
    if (angle === PI / 2 || angle === -PI / 2) {
      slope = Infinity; // or NaN, depending on your use case
      perpSlope = 0;
    } else {
      slope = tan(angle);
      perpSlope = -1 / slope;
    }
    return { perpSlope, angle };
  }

  calculateVertexes() {

    let { perpSlope, angle } = this.calculateSlopes();

    let dMultiplier = 1 + 1 / 3;
    let deltaX = this.d * dMultiplier * cos(angle);
    let deltaY = this.d * dMultiplier * sin(angle);
  
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
    } else  {
      // original line is not vertical or horizontal
      // this is what is getting called instead of the stuff below when moving right to left
      endAnchor1X = this.endDot.x + this.d / Math.sqrt(1 + perpSlope * perpSlope);
      endAnchor1Y = this.endDot.y + perpSlope * (endAnchor1X - this.endDot.x);
      endAnchor2X = this.endDot.x - this.d / sqrt(1 + perpSlope * perpSlope);
      endAnchor2Y = this.endDot.y + perpSlope * (endAnchor2X - this.endDot.x); // Use endAnchor2X here
    
      startAnchor1X = this.startDot.x - this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor1Y = this.startDot.y + perpSlope * (startAnchor1X - this.startDot.x);
      startAnchor2X = this.startDot.x + this.d / sqrt(1 + perpSlope * perpSlope);
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
    noStroke();
    strokeWeight(this.lineOutside);
    print('this.color', ...this.color);
    fill(...this.color);
    beginShape(); 
    vertex(endAnchor1X, endAnchor1Y);
    bezierVertex(
      endControl1X,
      endControl1Y,
      endControl2X,
      endControl2Y,
      endAnchor2X,
      endAnchor2Y
    );
    vertex(startAnchor1X, startAnchor1Y);
    bezierVertex(
      startControl1X,
      startControl1Y,
      startControl2X,
      startControl2Y,
      startAnchor2X,
      startAnchor2Y
    );
    endShape(CLOSE);

  }
}
class LineStraight {
  constructor(
    startDot,
    endDot,
    color,
    lineInside,
    lineOutside,
  ) {
    this.startDot = startDot;
    this.endDot = endDot;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.connectorLine = new ConnectorLine(startDot, endDot, color, lineInside, lineOutside);
  }
  drawLine() {
    // Use the ConnectorLine instance to draw the line
    this.connectorLine.drawLine();
  }

}
class LineCurve {
  constructor(
    startDot,
    endDot,
    color,
    lineInside,
    lineOutside,
  ) {
    this.startDot = startDot;
    this.endDot = endDot;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.connectorLine = new ConnectorLine(startDot, endDot, color, lineInside, lineOutside);
  }
  drawLine() {
    // Use the ConnectorLine instance to draw the line
    this.connectorLine.drawLine();
  }
}
