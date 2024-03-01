// import './libraries/p5.js';
import p5 from 'p5';
import { setup, draw, windowResized, drawGrid, findClosestDotToMouse, mouseMoved, initializeGrid, createDotPositions, createOrUpdateLine, drawLinesArray, ConnectorLine} from './000_JS_code/m_sketch_v1.js';

new p5((p) => {
  p.setup = () => {
    setup(p);
  };

  p.draw = () => {
    draw(p);
  };
  p.drawGrid = () => {
    drawGrid(p);
  };

  p.windowResized = () => {
    windowResized(p);
  };
  p.initializeGrid = () => {
    initializeGrid(p);
  };


  p.mouseMoved = () => {
    mouseMoved(p);
  };
  p.createDotPositions = () => {
    createDotPositions(p);
  };
  p.findClosestDotToMouse = () => {
    findClosestDotToMouse(p);
  };
  p.createOrUpdateLine = () => {
    createOrUpdateLine(p);
  };
  p.drawLinesArray = () => {
    drawLinesArray(p);
  };
});


import './000_JS_code/m_sketch_v1.js';


