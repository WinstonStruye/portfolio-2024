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
  