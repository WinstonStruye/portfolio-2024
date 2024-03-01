class ConnectorLine {
  constructor(
    startX,
    startY,
    endX,
    endY,
    color,
    lineInside,
    lineOutside,
    insideColor
  ) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.insideColor = insideColor;
    this.d = 15;
  }

  calculateSlopes() {
    let angle = atan2(this.endY - this.startY, this.endX - this.startX);
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
      endAnchor1X = this.endX + this.d;
      endAnchor1Y = this.endY;
      endAnchor2X = this.endX - this.d;
      endAnchor2Y = this.endY;

      startAnchor1X = this.startX - this.d;
      startAnchor1Y = this.startY;
      startAnchor2X = this.startX + this.d;
      startAnchor2Y = this.startY;
    } else if (isFinite(perpSlope)) {
      // original line is not vertical or horizontal
      endAnchor1X = this.endX + this.d / Math.sqrt(1 + perpSlope * perpSlope);
      endAnchor1Y = this.endY + perpSlope * (endAnchor1X - this.endX);
      endAnchor2X = this.endX - this.d / sqrt(1 + perpSlope * perpSlope);
      endAnchor2Y = this.endY - perpSlope * (endAnchor1X - this.endX);

      startAnchor1X = this.startX - this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor1Y = this.startY + perpSlope * (startAnchor1X - this.startX);
      startAnchor2X = this.startX + this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor2Y = this.startY - perpSlope * (startAnchor1X - this.startX);
    } else {
      // original line is horizontal
      endAnchor1X = this.endX;
      endAnchor1Y = this.endY + this.d;
      endAnchor2X = this.endX;
      endAnchor2Y = this.endY - this.d;

      startAnchor1X = this.startX;
      startAnchor1Y = this.startY - this.d;
      startAnchor2X = this.startX;
      startAnchor2Y = this.startY + this.d;
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
    strokeWeight(this.lineOutside);
    stroke(this.color);
    noFill();
    beginShape();
    // vertex(this.startX, this.startY);
    // vertex(this.endX, this.endY);
    // vertex(this.startX, this.startY); // Start vertex
    // vertex(this.endX, this.endY);     // End vertex
    vertex(endAnchor1X, endAnchor1Y); // Perpendicular vertex
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

    // Perpendicular vertex
    endShape(CLOSE);

  }
}
class LineStraight {
  constructor(
    startX,
    startY,
    endX,
    endY,
    color,
    lineInside,
    lineOutside,
    insideColor
  ) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.insideColor = insideColor;
    this.d = 15;
  }

  calculateSlopes() {
    let angle = atan2(this.endY - this.startY, this.endX - this.startX);
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
      endAnchor1X = this.endX + this.d;
      endAnchor1Y = this.endY;
      endAnchor2X = this.endX - this.d;
      endAnchor2Y = this.endY;

      startAnchor1X = this.startX - this.d;
      startAnchor1Y = this.startY;
      startAnchor2X = this.startX + this.d;
      startAnchor2Y = this.startY;
    } else if (isFinite(perpSlope)) {
      // original line is not vertical or horizontal
      endAnchor1X = this.endX + this.d / Math.sqrt(1 + perpSlope * perpSlope);
      endAnchor1Y = this.endY + perpSlope * (endAnchor1X - this.endX);
      endAnchor2X = this.endX - this.d / sqrt(1 + perpSlope * perpSlope);
      endAnchor2Y = this.endY - perpSlope * (endAnchor1X - this.endX);

      startAnchor1X = this.startX - this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor1Y = this.startY + perpSlope * (startAnchor1X - this.startX);
      startAnchor2X = this.startX + this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor2Y = this.startY - perpSlope * (startAnchor1X - this.startX);
    } else {
      // original line is horizontal
      endAnchor1X = this.endX;
      endAnchor1Y = this.endY + this.d;
      endAnchor2X = this.endX;
      endAnchor2Y = this.endY - this.d;

      startAnchor1X = this.startX;
      startAnchor1Y = this.startY - this.d;
      startAnchor2X = this.startX;
      startAnchor2Y = this.startY + this.d;
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
    strokeWeight(this.lineOutside);
    stroke(this.color);
    noFill();
    beginShape();
    // vertex(this.startX, this.startY);
    // vertex(this.endX, this.endY);
    // vertex(this.startX, this.startY); // Start vertex
    // vertex(this.endX, this.endY);     // End vertex
    vertex(endAnchor1X, endAnchor1Y); // Perpendicular vertex
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

    // Perpendicular vertex
    endShape(CLOSE);

  }
}
class LineCurve {
  constructor(
    startX,
    startY,
    endX,
    endY,
    color,
    lineInside,
    lineOutside,
    insideColor
  ) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.lineInside = lineInside;
    this.lineOutside = lineOutside;
    this.insideColor = insideColor;
    this.d = 15;
  }

  calculateSlopes() {
    let angle = atan2(this.endY - this.startY, this.endX - this.startX);
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
      endAnchor1X = this.endX + this.d;
      endAnchor1Y = this.endY;
      endAnchor2X = this.endX - this.d;
      endAnchor2Y = this.endY;

      startAnchor1X = this.startX - this.d;
      startAnchor1Y = this.startY;
      startAnchor2X = this.startX + this.d;
      startAnchor2Y = this.startY;
    } else if (isFinite(perpSlope)) {
      // original line is not vertical or horizontal
      endAnchor1X = this.endX + this.d / Math.sqrt(1 + perpSlope * perpSlope);
      endAnchor1Y = this.endY + perpSlope * (endAnchor1X - this.endX);
      endAnchor2X = this.endX - this.d / sqrt(1 + perpSlope * perpSlope);
      endAnchor2Y = this.endY - perpSlope * (endAnchor1X - this.endX);

      startAnchor1X = this.startX - this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor1Y = this.startY + perpSlope * (startAnchor1X - this.startX);
      startAnchor2X = this.startX + this.d / sqrt(1 + perpSlope * perpSlope);
      startAnchor2Y = this.startY - perpSlope * (startAnchor1X - this.startX);
    } else {
      // original line is horizontal
      endAnchor1X = this.endX;
      endAnchor1Y = this.endY + this.d;
      endAnchor2X = this.endX;
      endAnchor2Y = this.endY - this.d;

      startAnchor1X = this.startX;
      startAnchor1Y = this.startY - this.d;
      startAnchor2X = this.startX;
      startAnchor2Y = this.startY + this.d;
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
    strokeWeight(this.lineOutside);
    stroke(this.color);
    noFill();
    beginShape();
    // vertex(this.startX, this.startY);
    // vertex(this.endX, this.endY);
    // vertex(this.startX, this.startY); // Start vertex
    // vertex(this.endX, this.endY);     // End vertex
    vertex(endAnchor1X, endAnchor1Y); // Perpendicular vertex
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

    // Perpendicular vertex
    endShape(CLOSE);
  }
}
