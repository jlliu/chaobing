class Cursor {
  constructor() {
    this.state = "default";
  }
  display() {
    let simMousePos = {
      x: Math.floor((mouse_x - 25) / scaleRatio),
      y: Math.floor(mouse_y / scaleRatio),
    };
    let cursorToDraw;
    if (cursorState == "pointer") {
      cursorToDraw = pointCursor;
    } else if (cursorState == "grab") {
      cursorToDraw = grabCursor;
    } else if (cursorState == "hold") {
      cursorToDraw = holdCursor;
    } else {
      cursorToDraw = bingCursor;
    }
    drawImageToScale(cursorToDraw, simMousePos.x, simMousePos.y);
  }
}
