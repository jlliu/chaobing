// save this file as sketch.js
// Sketch One

let game1canvas;

var game1 = function (p) {
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let cursor;
  let cursorState = "default";
  let sceneState = "story";

  let currentlyAnimating = false;
  let timedAnimationIndex = 0;
  let currentlyDragging = false;

  let clickedObjects = [];

  let story1_text = [];

  p.preload = function () {
    img = p.loadImage("assets/UI/storybook-bg-case.png");
    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //game 1 assets
    g1_bg = p.loadImage("assets/img/game1/bg.png");
    g1_blanket = p.loadImage("assets/img/game1/blanket.png");
    g1_blanket2 = p.loadImage("assets/img/game1/blanket2.png");
    g1_drawer = p.loadImage("assets/img/game1/drawer.png");
    g1_drawer2 = p.loadImage("assets/img/game1/drawer2.png");
    g1_panda = p.loadImage("assets/img/game1/panda.png");
    g1_pillow = p.loadImage("assets/img/game1/pillow.png");
    g1_poster = p.loadImage("assets/img/game1/poster.png");
    g1_poster2 = p.loadImage("assets/img/game1/poster2.png");
    g1_shirt = p.loadImage("assets/img/game1/shirt.png");
    g1_skirt = p.loadImage("assets/img/game1/skirt.png");
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    calculateCanvasDimensions(p);
    game1canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game1canvas.classList.add("gameCanvas");
    game1canvas.id = "game1";
    p.noSmooth();

    //Navigation stuff
    rightButton = new Button(button_r_up, button_r_down, 503, 407);
    leftButton = new Button(button_l_up, button_l_down, 37, 407);
    rightButton.addClickEvent(function (e) {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      harpTransitionOutSound.play();
      currentSceneNum++;
      // We need to hide this.
      game1canvas.style.display = "none";
      canvas1.style.opacity = 1;
      canvas1.style.display = "block";
      currentSceneNum++;
    });

    cursor = new Cursor();

    //Initialize Game 1 Sprites
    g1_drawerSprite = new Button(g1_drawer, g1_drawer, 390, 50);
    g1_drawerSprite.addClickEvent(function (e) {
      g1_drawerSprite.buttonDefault = g1_drawer2;
      g1_drawerSprite.buttonHover = g1_drawer2;
      g1_drawerSprite.interactive = false;
      pageFlipSound.play();
    });
    g1_posterSprite = new Button(g1_poster, g1_poster, 30, 30);
    g1_posterSprite.addClickEvent(function (e) {
      g1_posterSprite.buttonDefault = g1_poster2;
      g1_posterSprite.buttonHover = g1_poster2;
      g1_posterSprite.interactive = false;
      pageFlipSound.play();
    });
    g1_blanketSprite = new Button(g1_blanket, g1_blanket, 110, 120);
    g1_blanketSprite.addClickEvent(function (e) {
      g1_blanketSprite.buttonDefault = g1_blanket2;
      g1_blanketSprite.buttonHover = g1_blanket2;
      g1_blanketSprite.interactive = false;
      pageFlipSound.play();
    });
    g1_pillowSprite = new Draggable(
      g1_pillow,
      g1_pillow,
      470,
      300,
      250,
      100,
      [138, 424],
      [60, 340]
    );
    g1_shirtSprite = new Draggable(
      g1_shirt,
      g1_shirt,
      46,
      294,
      null,
      null,
      [34, 170],
      [150, 263]
    );
    g1_skirtSprite = new Draggable(
      g1_skirt,
      g1_skirt,
      360,
      392,
      null,
      null,
      [34, 170],
      [150, 263]
    );
  };

  p.draw = function () {
    // console.log("GAME: " + p.mouseX + " , " + p.mouseY);
    mouse_x = p.mouseX;
    mouse_y = p.mouseY;
    //Cursor is default unless otherwise specified
    // console.log("drawing game 1");
    cursorState = "default";
    // p.background("green");
    displayScene2();
    cursor.display();
  };

  ////////////////////////////////////////////
  // -------------- SCENES --------------- //
  //////////////////////////////////////////

  // Story 1

  // Game 1
  function displayScene2() {
    p.image(g1_bg, 0, 0, canvasWidth, canvasHeight);
    // drawImageToScale(g1_drawer, 390, 50, g1_drawer.width, g1_drawer.height);
    g1_drawerSprite.display();
    g1_posterSprite.display();
    g1_blanketSprite.display();
    g1_pillowSprite.display();
    g1_shirtSprite.display();
    g1_skirtSprite.display();

    //detect if drawer clicked, then we swich the image.
    rightButton.display();
    leftButton.display();
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
      let _this = this;
      game1canvas.addEventListener("mousedown", function (e) {
        if (_this.isMouseInBounds()) {
          _this.intendingToClick = true;
          clickedObjects.push(_this);
        }
      });
    }

    addClickEvent(clickFunction) {
      let _this = this;
      game1canvas.addEventListener("click", function (e) {
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
      game1canvas.addEventListener("mousedown", function (e) {
        if (_this.mouseInBounds) {
          _this.dragging = true;
          currentlyDragging = true;
          clickedObjects.forEach(function (value) {
            value.intendingToClick = false;
            clickedObjects = [];
          });
        }
      });
      //Note: how to make it not conflict
      game1canvas.addEventListener("mouseup", function (e) {
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

  // HELPERS
  p.windowResized = function () {
    calculateCanvasDimensions();
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  // Make it so when we press next button, we go to the next scene

  function timedAnimation(timeInfo) {
    // should trigger audio.. when i have it.
    currentlyAnimating = true;
    timeInfo.forEach(function (value, index) {
      setTimeout(function () {
        timedAnimationIndex = (index + 1) % timeInfo.length;
        timedAnimationIndex == 0
          ? (currentlyAnimating = false)
          : (currentlyAnimating = true);
      }, value);
    });
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

  function calculateCanvasDimensions() {
    if (p.windowWidth / p.windowHeight > canvasRatio) {
      canvasWidth = p.windowHeight * canvasRatio;
      canvasHeight = p.windowHeight;
    } else {
      canvasWidth = p.windowWidth;
      canvasHeight = p.windowWidth / canvasRatio;
    }
    scaleRatio = canvasWidth / 640;
  }
};

new p5(game1, "canvas2");
