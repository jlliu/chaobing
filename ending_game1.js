// Game N: Template for any game number

let game1canvas;

var game1 = function (p) {
  let thisCanvas;
  let thisSceneNum = 1;
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let cursor;
  let cursorState = "pointer";
  let sceneState = "story";

  let currentlyAnimating = false;
  let timedAnimationIndex = 0;
  let currentlyDragging = false;

  let clickedObjects = [];

  let currentImage;
  let sliceNum = 0;
  let gap = 10;
  let sliceWidth = 20;
  let totalWidth;
  let slicingDone = false;

  let currentKnifeImg;

  p.preload = function () {
    //Preload a background here
    bg_chop = p.loadImage("assets/img/ending/bg-chop.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded

    bing = p.loadImage("assets/img/ending/scallion-test.png");

    // me = p.loadImage("assets/img/ending/me-kid.png");

    knife_up = p.loadImage("assets/img/ending/knife-up.png");
    knife_down = p.loadImage("assets/img/ending/knife-down.png");
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    // calculateCanvasDimensions(p);
    game1canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game1canvas.classList.add("gameCanvas");
    game1canvas.classList.add("game1");
    game1canvas.id = "game1";
    thisCanvas = game1canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game N Sprites
    currentImage = bing;
    totalWidth = currentImage.width;

    currentKnifeImg = knife_up;

    // var options = document.chopForm
    var chopForm = document.getElementById("chopForm");

    chopForm.addEventListener("input", function (e) {
      let imagePath = `assets/img/ending/${e.target.value}`;
      currentImage = p.loadImage(imagePath, function () {
        totalWidth = currentImage.width;
        sliceNum = 0;
      });
    });

    thisCanvas.addEventListener("click", function () {
      if (sliceNum * sliceWidth > currentImage.width - 30) {
        console.log("slicing done");
        sliceNum = 0;
        totalWidth = currentImage.width;
      } else {
        sliceNum++;
        totalWidth = sliceNum * gap + currentImage.width;
      }
      currentKnifeImg = knife_down;
      setTimeout(function () {
        currentKnifeImg = knife_up;
      }, 100);
    });
  };

  p.draw = function () {
    mouse_x = p.mouseX;
    mouse_y = p.mouseY;
    //Cursor is default unless otherwise specified
    cursorState = "default";
    displayGame();
    cursor.display();
  };

  ////////////////////////////////////////////
  // -------------- SCENES --------------- //
  //////////////////////////////////////////

  // Game 1
  function displayGame() {
    p.image(bg_chop, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    let remaining = currentImage.width;
    let dy = p.height / 2 - currentImage.height / 2;
    for (var i = 0; i < sliceNum; i++) {
      // console.log("drawing  a slice");
      let xRange = [i * sliceWidth, (i + 1) * sliceWidth];

      let dx = p.width / 2 - totalWidth / 2 + i * (sliceWidth + gap);
      p.image(
        currentImage,
        dx,
        dy,
        sliceWidth,
        currentImage.height,
        i * sliceWidth,
        0,
        sliceWidth,
        currentImage.height
      );
      remaining -= sliceWidth;
    }

    p.image(
      currentImage,
      p.width / 2 - totalWidth / 2 + sliceNum * (sliceWidth + gap),
      dy,
      currentImage.width,
      currentImage.height,
      currentImage.width - remaining,
      0
    );

    p.image(
      currentKnifeImg,
      p.width / 2 - totalWidth / 2 + sliceNum * (sliceWidth + gap) - 40,
      100
    );

    // Navigation
    // rightButton.display();
    // leftButton.display();
  }

  // CLASSES
  class Cursor {
    constructor() {
      this.state = "default";
    }
    display() {
      let simMousePos = {
        x: Math.floor((mouse_x - 25) / scaleRatio),
        y: Math.floor(mouse_y / scaleRatio),
      };
      // let cursorToDraw;
      // if (cursorState == "pointer") {
      //   cursorToDraw = pointCursor;
      // } else if (cursorState == "grab") {
      //   cursorToDraw = grabCursor;
      // } else if (cursorState == "hold") {
      //   cursorToDraw = holdCursor;
      // } else {
      //   cursorToDraw = bingCursor;
      // }
      drawImageToScale(pointCursor, simMousePos.x, simMousePos.y);
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
        mouse_x > this.x * scaleRatio &&
        mouse_x < this.x * scaleRatio + this.width * scaleRatio &&
        mouse_y > this.y * scaleRatio &&
        mouse_y < this.y * scaleRatio + this.height * scaleRatio;
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

      if (
        this.mouseInBounds &&
        this.interactive &&
        this.visible &&
        !currentlyAnimating
      ) {
        cursorState = "pointer";
      }
    }
  }

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
      thisCanvas.addEventListener("mousedown", function (e) {
        if (_this.mouseInBounds) {
          _this.dragging = true;
          currentlyDragging = true;
          clickedObjects.forEach(function (value) {
            value.intendingToClick = false;
            clickedObjects = [];
          });
        }
      });

      thisCanvas.addEventListener("mouseup", function (e) {
        // If dropped in the target area, then it's done
        if (_this.mouseInBounds) {
          _this.dragging = false;
          currentlyDragging = false;
          if (
            mouse_x > xRange[0] * scaleRatio &&
            mouse_x < xRange[1] * scaleRatio &&
            mouse_y > yRange[0] * scaleRatio &&
            mouse_y < yRange[1] * scaleRatio
          ) {
            _this.interactive = false;
            pageFlipSound.start();
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
      thisCanvas.addEventListener("click", function (e) {
        if (_this.isMouseInBounds(e.offsetX, e.offsetY)) {
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
        mouse_y < this.yCurrent * scaleRatio + this.height * scaleRatio;
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
        this.xCurrent = Math.floor((mouse_x - this.width / 2) / scaleRatio);
        this.yCurrent = Math.floor((mouse_y - this.height / 2) / scaleRatio);
      }
      if (this.visible) {
        drawImageToScale(imageToDraw, this.xCurrent, this.yCurrent);
      }
    }
  }

  // HELPERS

  function setupNavigation() {
    // p.noLoop();
    // document.addEventListener("navigateFwd", (e) => {
    //   if (currentSceneNum == thisSceneNum) {
    //     p.loop();
    //   }
    // });
    // document.addEventListener("navigateBack", (e) => {
    //   if (currentSceneNum == thisSceneNum + 1) {
    //     p.loop();
    //   }
    // });
    //Navigation stuff
    rightButton = new Button(button_r_up, button_r_down, 503, 407);
    leftButton = new Button(button_l_up, button_l_down, 37, 407);
    // rightButton.addClickEvent(function (e) {
    //   if (currentlyAnimating == false) {
    //     currentSceneNum++;
    //     harpTransitionOutSound.start();
    //     // We need to hide this.
    //     storyCanvas.style.visibility = "visible";
    //     storyCanvas.style.opacity = 1;
    //     window.setTimeout(function () {
    //       thisCanvas.style.visibility = "hidden";
    //       storyMode = true;
    //       // p.noLoop();
    //       hideCanvas();
    //     }, 1000);
    //     storyMode = true;
    //   }
    // });
    // leftButton.addClickEvent(function (e) {
    //   if (currentlyAnimating == false) {
    //     harpTransitionOutSound.start();
    //     // We need to hide this.
    //     storyCanvas.style.visibility = "visible";
    //     storyCanvas.style.opacity = 1;
    //     window.setTimeout(function () {
    //       thisCanvas.style.visibility = "hidden";
    //       storyMode = true;
    //       p.noLoop();
    //       hideCanvas();
    //     }, 1000);
    //     storyMode = true;
    //   }
    // });
  }

  function hideCanvas() {
    //Add things we want to do when we leave this scene
  }

  // p.windowResized = function () {
  //   calculateCanvasDimensions();
  //   p.resizeCanvas(canvasWidth, canvasHeight);
  // };

  // Animates a sprite given the images as frames, based on a certain interval, with optional callback
  function intervalAnimation(sprite, frames, interval, callback) {
    currentlyAnimating = true;
    let original = sprite.buttonDefault;
    frames.forEach(function (img, index) {
      setTimeout(function () {
        timedAnimationIndex = (index + 1) % frames.length;
        sprite.buttonDefault = img;
      }, interval * index);
    });
    // Another for the last frame
    setTimeout(function () {
      currentlyAnimating = false;
      sprite.buttonDefault = original;
      if (callback) {
        callback();
      }
    }, interval * frames.length);
  }

  function drawImageToScale(img, x, y) {
    p.image(
      img,
      x * scaleRatio,
      y * scaleRatio,
      img.width * scaleRatio,
      img.height * scaleRatio
    );
  }

  // function calculateCanvasDimensions() {
  //   if (p.windowWidth / p.windowHeight > canvasRatio) {
  //     canvasWidth = p.windowHeight * canvasRatio;
  //     canvasHeight = p.windowHeight;
  //   } else {
  //     canvasWidth = p.windowWidth;
  //     canvasHeight = p.windowWidth / canvasRatio;
  //   }
  //   scaleRatio = canvasWidth / 640;
  // }
};

new p5(game1, "canvas-game1");
