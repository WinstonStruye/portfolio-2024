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
      beginShape();
      vertex(this.startX, this.startY);
      vertex(this.endX, this.endY);
      endShape();
      //line(this.startX, this.startY, this.endX, this.endY); // Draw the line
  
      strokeWeight(this.lineInside);
      stroke(this.insideColor);
      beginShape();
      vertex(this.startX, this.startY);
      vertex(this.endX, this.endY);
      endShape();
    }
  }
  