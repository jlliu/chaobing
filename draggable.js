class Draggable {
  constructor(
    defaultImg,
    hoverImg,
    xPos,
    yPos,
    xFinal,
    yFinal,
    xRange,
    yRange
  ) {
    this.x = xPos;
    this.y = yPos;
    this.buttonDefault = defaultImg;
    this.buttonHover = hoverImg;
    this.width = this.buttonDefault.width;
    this.height = this.buttonDefault.height;
    this.mouseInBounds = false;
    this.interactive = true;
    this.visible = true;
    this.dragging = false;
    this.xCurrent = this.x;
    this.yCurrent = this.y;
    this.xFinal = xFinal;
    this.yFinal = yFinal;
    this.xRange = xRange;
    this.yRange = yRange;
    let _this = this;

    //once the single mousedown event, this item drags everywhere until we drop it
    canvasEl.addEventListener("mousedown", function (e) {
      if (_this.mouseInBounds) {
        console.log("startingToDrag");
        _this.dragging = true;
        currentlyDragging = true;
        clickedObjects.forEach(function (value) {
          value.intendingToClick = false;
          clickedObjects = [];
        });
      }
    });
    //Note: how to make it not conflict
    canvasEl.addEventListener("mouseup", function (e) {
      // If dropped in the target area, then it's done
      if (_this.mouseInBounds) {
        console.log("release");
        _this.dragging = false;
        currentlyDragging = false;
        if (
          mouse_x > xRange[0] * scaleRatio &&
          mouse_x < xRange[1] * scaleRatio &&
          mouse_y > yRange[0] * scaleRatio &&
          mouse_y < yRange[1] * scaleRatio
        ) {
          console.log("dropped in range");
          _this.interactive = false;
          pageFlipSound.play();
          //Snap it into position if we don't make it disappear
          if (_this.xFinal && _this.yFinal) {
            _this.xCurrent = _this.xFinal;
            _this.yCurrent = _this.yFinal;
          } else {
            _this.visible = false;
          }
        } else {
          _this.xCurrent = _this.x;
          _this.yCurrent = _this.y;
        }
      }
    });
  }

  addClickEvent(clickFunction) {
    let _this = this;
    canvasEl.addEventListener("click", function (e) {
      if (_this.isMouseInBounds(e.offsetX, e.offsetY)) {
        console.log("this is successful click, let's do this function");
        clickFunction();
      }
    });
  }
  isMouseInBounds() {
    this.mouseInBounds =
      !currentlyAnimating &&
      this.interactive &&
      mouse_x > this.xCurrent * scaleRatio &&
      mouse_x < this.xCurrent * scaleRatio + this.width * scaleRatio &&
      mouse_y > this.yCurrent * scaleRatio &&
      mouse_y < this.yCurrent * scaleRatio + this.width * scaleRatio;
    return this.mouseInBounds;
  }

  display() {
    let imageToDraw = this.isMouseInBounds()
      ? this.buttonHover
      : this.buttonDefault;

    if (this.mouseInBounds && this.interactive) {
      cursorState = "grab";
    }
    if (this.dragging) {
      cursorState = "hold";
      this.xCurrent = Math.floor((mouse_x - 50) / scaleRatio);
      this.yCurrent = Math.floor((mouse_y - 50) / scaleRatio);
    }
    if (this.visible) {
      drawImageToScale(imageToDraw, this.xCurrent, this.yCurrent);
    }

    // this.visible = true;
  }
}
