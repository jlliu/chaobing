// Game N: Template for any game number

let endCanvas;

var end = function (p) {
  let thisCanvas;
  let canvasWidthEnd = 640;
  let canvasHeightEnd = 400;
  let scaleRatioEnd = 1;
  let thisSceneNum = 8;
  let canvasRatioEnd = canvasWidthEnd / canvasHeightEnd;
  let mouse_x;
  let mouse_y;
  let cursor;
  let cursorState = "default";
  let sceneState = "story";
  let currentlyAnimating = false;
  let currentlyDragging = false;

  let buttonPlaceholder;

  let gameEntered = false;

  let htmlToDraw;

  p.preload = function () {
    //Preload a background here

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    //Preload whatever needs to be preloaded

    html = p.loadImage("assets/video/end_html.png");
    htmlHover = p.loadImage("assets/video/end_html_hover.png");

    buttonPlaceholder = p.loadImage("assets/video/button_placeholder.png");
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    calculateCanvasDimensions(p);
    endCanvas = p.createCanvas(canvasWidthEnd, canvasHeightEnd).elt;
    endCanvas.classList.add("endCanvas");
    endCanvas.id = "end";
    thisCanvas = endCanvas;
    p.noSmooth();

    cursor = new Cursor();

    // p.noLoop();
    htmlToDraw = html;

    //Initialize Game N Sprites
    buttonPlaceholder = new Button(
      buttonPlaceholder,
      buttonPlaceholder,
      264,
      287
    );
    buttonPlaceholder.visible = false;
    buttonPlaceholder.addClickEvent(function () {
      window.location.href = "ending.html";
    });
    numCanvasSetup++;
  };

  p.draw = function () {
    p.clear();
    mouse_x = p.mouseX;
    mouse_y = p.mouseY;
    //Cursor is default unless otherwise specified
    p.image(htmlToDraw, 0, 0, canvasWidthEnd, canvasHeightEnd);
    cursor.display();
    buttonPlaceholder.display();
  };

  function setupNavigation() {
    document.addEventListener("navigateFwd", (e) => {
      if (currentSceneNum == thisSceneNum) {
        gameEntered = true;
        p.loop();
      }
    });
  }

  // CLASSES
  class Cursor {
    constructor() {
      this.state = "default";
    }
    display() {
      let simMousePos = {
        x: Math.floor((mouse_x - 25) / scaleRatioEnd),
        y: Math.floor(mouse_y / scaleRatioEnd),
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

  class Button {
    constructor(buttonDefaultImg, buttonHover, xPos, yPos) {
      this.x = xPos;
      this.y = yPos;
      this.buttonDefault = buttonDefaultImg;
      this.buttonHover = buttonHover;
      this.width = buttonDefaultImg.width;
      this.height = buttonDefaultImg.height;
      this.mouseInBounds = false;
      this.interactive = true;
      this.intendingToClick = false;
      this.visible = true;
      let _this = this;
      thisCanvas.addEventListener("mousedown", function (e) {
        if (_this.isMouseInBounds()) {
          _this.intendingToClick = true;
          clickedObjects.push(_this);
        }
      });
    }

    addClickEvent(clickFunction) {
      let _this = this;
      thisCanvas.addEventListener("click", function (e) {
        if (_this.isMouseInBounds() && _this.intendingToClick) {
          clickFunction();
          _this.intendingToClick = false;
          clickedObjects = [];
        }
      });
    }
    isMouseInBounds() {
      this.mouseInBounds =
        this.interactive &&
        !currentlyAnimating &&
        mouse_x > this.x * scaleRatioEnd &&
        mouse_x < this.x * scaleRatioEnd + this.width * scaleRatioEnd &&
        mouse_y > this.y * scaleRatioEnd &&
        mouse_y < this.y * scaleRatioEnd + this.height * scaleRatioEnd;
      this.mouseInBounds ? (htmlToDraw = htmlHover) : (htmlToDraw = html);
      return this.mouseInBounds;
    }

    display() {
      let imageToDraw =
        this.isMouseInBounds() && !currentlyDragging && !currentlyAnimating
          ? this.buttonHover
          : this.buttonDefault;

      if (this.visible) {
        drawImageToScale(imageToDraw, this.x, this.y);
      }
      if (this.mouseInBounds && this.interactive && !currentlyAnimating) {
        cursorState = "pointer";
      } else {
        cursorState = "default";
      }
    }
  }

  p.windowResized = function () {
    calculateCanvasDimensions();
    p.resizeCanvas(canvasWidthEnd, canvasHeightEnd);
  };

  function drawImageToScale(img, x, y) {
    p.image(
      img,
      x * scaleRatioEnd,
      y * scaleRatioEnd,
      img.width * scaleRatioEnd,
      img.height * scaleRatioEnd
    );
  }

  function calculateCanvasDimensions() {
    if (p.windowWidth / p.windowHeight > canvasRatioEnd) {
      canvasWidthEnd = p.windowHeight * canvasRatioEnd;
      canvasHeightEnd = p.windowHeight;
    } else {
      canvasWidthEnd = p.windowWidth;
      canvasHeightEnd = p.windowWidth / canvasRatioEnd;
    }
    scaleRatioEnd = canvasWidthEnd / 640;
  }
};

new p5(end, "canvas-end");
