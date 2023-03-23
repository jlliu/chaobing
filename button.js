class Button {
  constructor(thisCanvas, buttonDefaultImg, buttonHover, xPos, yPos) {
    this.thisCanvas = thisCanvas;
    this.x = xPos;
    this.y = yPos;
    this.buttonDefault = buttonDefaultImg;
    this.buttonHover = buttonHover;
    this.width = buttonDefaultImg.width;
    this.height = buttonDefaultImg.height;
    this.mouseInBounds = false;
    this.interactive = true;
    this.intendingToClick = false;
    let _this = this;
    this.thisCanvas.addEventListener("mousedown", function (e) {
      if (_this.isMouseInBounds()) {
        console.log("hello");
        console.log(currentlyDragging);
        _this.intendingToClick = true;
        clickedObjects.push(_this);
      }
    });
  }

  addClickEvent(clickFunction) {
    let _this = this;
    this.thisCanvas.addEventListener("click", function (e) {
      console.log("currently dragging");
      console.log(currentlyDragging);
      if (_this.isMouseInBounds() && _this.intendingToClick) {
        clickFunction();
        _this.intendingToClick = false;
        clickedObjects = [];
      }
    });
  }
  isMouseInBounds() {
    this.mouseInBounds =
      // !currentlyAnimating &&
      this.interactive &&
      mouse_x > this.x * scaleRatio &&
      mouse_x < this.x * scaleRatio + this.width * scaleRatio &&
      mouse_y > this.y * scaleRatio &&
      mouse_y < this.y * scaleRatio + this.width * scaleRatio;
    return this.mouseInBounds;
  }

  display() {
    let imageToDraw = this.isMouseInBounds()
      ? this.buttonHover
      : this.buttonDefault;

    drawImageToScale(imageToDraw, this.x, this.y);
    if (this.mouseInBounds && this.interactive) {
      cursorState = "pointer";
    }
    // this.visible = true;
  }
}
