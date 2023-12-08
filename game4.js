// Game N: Template for any game number

let game4canvas;

let game4_paintColor = "none";

let paintSounds = [squelchSound, squishSound, fart2Sound, fart3Sound];

let chosenPaintSound;

const changeColorEvent = new Event("changeColor");

var game4 = function (p) {
  let thisCanvas;
  let thisSceneNum = 4;
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let restartButton;
  let cursor;
  let cursorState = "default";
  let sceneState = "story";

  let currentlyAnimating = false;
  let timedAnimationIndex = 0;
  let currentlyDragging = false;

  let clickedObjects = [];

  let paintImgs = [];
  let paintSprites = [];

  let stickerImgs = [];

  let stickerSprites = [];

  let draggingStickers = [];

  let paintCursor = "none";

  let gameEntered = false;
  let gameStarted = false;

  p.preload = function () {
    //Preload a background here
    g4_bg = p.loadImage("assets/img/game4/bg.png");
    case_frame = p.loadImage("assets/img/game4/case-frame.png");

    paint_pan = p.loadImage("assets/img/game4/paint-pan.png");

    for (let i = 0; i < 8; i++) {
      paintImgs.push({
        default: p.loadImage(`assets/img/game4/paint${i}.png`),
        hover: p.loadImage(`assets/img/game4/paint${i}-h.png`),
      });
    }

    sticker_paper = p.loadImage("assets/img/game4/sticker-paper.png");

    for (let i = 0; i < 6; i++) {
      stickerImgs.push({
        default: p.loadImage(`assets/img/game4/sticker${i + 1}.png`),
        hover: p.loadImage(`assets/img/game4/sticker${i + 1}-h.png`),
      });
    }

    sriracha = p.loadImage("assets/img/game4/sriracha.png");
    sriracha_h = p.loadImage("assets/img/game4/sriracha-h.png");
    nailpolish = p.loadImage("assets/img/game4/polish.png");
    nailpolish_h = p.loadImage("assets/img/game4/polish-h.png");

    flute = p.loadImage("assets/img/game4/flute.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    srirachaCursor = p.loadImage("assets/UI/cursors/sriracha-cursor.png");
    polishCursor = p.loadImage("assets/UI/cursors/polish-cursor.png");
    brushCursor = p.loadImage("assets/UI/cursors/brush-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game4canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game4canvas.classList.add("gameCanvas");
    game4canvas.classList.add("game4");
    game4canvas.id = "game4";
    thisCanvas = game4canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    fluteSprite = new Button(
      flute,
      flute,
      322,
      0,
      [315, -67, 676, 66, 645, 133, 290, 0]
    );

    paintSprite_red = new Button(
      paintImgs[0].default,
      paintImgs[0].hover,
      0,
      158,
      [-6, 154, 26, 161, 38, 188, 5.5, 194]
    );
    paintSprite_red.color = "pink";
    paintSprite_red.sound = paintSounds[0];
    paintSprites.push(paintSprite_red);

    paintSprite_orange = new Button(
      paintImgs[1].default,
      paintImgs[1].hover,
      28,
      154,
      [31, 160, 62, 158, 71, 185, 42, 188]
    );
    paintSprite_orange.color = "orange";
    paintSprite_orange.sound = paintSounds[1];

    paintSprites.push(paintSprite_orange);

    paintSprite_yellow = new Button(
      paintImgs[2].default,
      paintImgs[2].hover,
      63,
      151,
      [67, 157, 95, 155, 107, 181, 75, 184]
    );
    paintSprite_yellow.color = "yellow";
    paintSprite_yellow.sound = paintSounds[2];

    paintSprites.push(paintSprite_yellow);

    paintSprite_green = new Button(
      paintImgs[3].default,
      paintImgs[3].hover,
      98,
      149,
      [101, 155, 129, 153, 141, 176, 112, 180]
    );
    paintSprite_green.color = "green";
    paintSprite_green.sound = paintSounds[3];

    paintSprites.push(paintSprite_green);

    paintSprite_blue = new Button(
      paintImgs[4].default,
      paintImgs[4].hover,
      1,
      190,
      [5, 199, 37, 194, 48, 222, 14, 225]
    );
    paintSprite_blue.color = "blue";
    paintSprite_blue.sound = paintSounds[0];

    paintSprites.push(paintSprite_blue);

    paintSprite_purple = new Button(
      paintImgs[5].default,
      paintImgs[5].hover,
      39,
      186,
      [43, 194, 73, 190, 82, 218, 52, 222]
    );
    paintSprite_purple.color = "purple";
    paintSprite_purple.sound = paintSounds[1];

    paintSprites.push(paintSprite_purple);

    paintSprite_black = new Button(
      paintImgs[6].default,
      paintImgs[6].hover,
      74,
      183,
      [78, 190, 108, 187, 122, 214, 87, 217]
    );
    paintSprite_black.color = "black";
    paintSprite_black.sound = paintSounds[2];

    paintSprites.push(paintSprite_black);

    paintSprite_white = new Button(
      paintImgs[7].default,
      paintImgs[7].hover,
      111,
      179,
      [114, 185, 143, 183, 156, 210, 125, 214]
    );
    paintSprite_white.color = "white";
    paintSprite_white.sound = paintSounds[3];

    paintSprites.push(paintSprite_white);

    paintSprites.forEach(function (sprite) {
      sprite.addClickEvent(function () {
        paintCursor = "brush";
        game4_paintColor = sprite.color;
        chosenPaintSound = sprite.sound;
        document.dispatchEvent(changeColorEvent);
      });
    });

    stickerSprites.push(
      new Draggable(
        stickerImgs[0].default,
        stickerImgs[0].hover,
        3,
        250,
        [195, 595],
        [152, 305]
      )
    );

    stickerSprites.push(
      new Draggable(
        stickerImgs[1].default,
        stickerImgs[1].hover,
        67,
        252,
        [195, 595],
        [152, 305]
      )
    );

    stickerSprites.push(
      new Draggable(
        stickerImgs[2].default,
        stickerImgs[2].hover,
        116,
        246,
        [195, 595],
        [152, 305]
      )
    );

    stickerSprites.push(
      new Draggable(
        stickerImgs[3].default,
        stickerImgs[3].hover,
        -2,
        302,
        [195, 595],
        [152, 305]
      )
    );
    stickerSprites.push(
      new Draggable(
        stickerImgs[4].default,
        stickerImgs[4].hover,
        61,
        293,
        [195, 595],
        [152, 305]
      )
    );
    stickerSprites.push(
      new Draggable(
        stickerImgs[5].default,
        stickerImgs[5].hover,
        104,
        295,
        [195, 595],
        [152, 305]
      )
    );

    srirachaSprite = new Button(sriracha, sriracha_h, 27, 0);
    srirachaSprite.addClickEvent(function (sprite) {
      paintCursor = "sriracha";
      game4_paintColor = "sriracha";
      chosenPaintSound = mmmSound;
      document.dispatchEvent(changeColorEvent);
    });

    nailpolishSprite = new Button(nailpolish, nailpolish_h, 139, 17);
    nailpolishSprite.addClickEvent(function (sprite) {
      paintCursor = "polish";
      game4_paintColor = "polish";
      chosenPaintSound = magicWandSound;
      document.dispatchEvent(changeColorEvent);
    });
  };

  p.draw = function () {
    p.clear();
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
    if (gameEntered && !gameStarted) {
      gameStarted = true;
      playGameVoiceover(game4_voiceover, 11);
    }
    p.image(g4_bg, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    srirachaSprite.display();
    nailpolishSprite.display();
    fluteSprite.display();

    drawImageToScale(sticker_paper, 0, 226);

    drawImageToScale(paint_pan, 0, 145);
    paintSprites.forEach(function (sprite) {
      sprite.display();
    });

    // stickerSprites.forEach(function (sprite) {

    // });
    stickerSprites.forEach(function (sprite) {
      drawImageToScale(sprite.buttonDefault, sprite.x, sprite.y);
      sprite.display();
    });

    p.image(case_frame, 0, 0, canvasWidth, canvasHeight);
    draggingStickers.forEach(function (sprite) {
      sprite.display();
    });
    // Navigation
    rightButton.display();
    leftButton.display();
    restartButton.display();
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
        if (paintCursor != "none") {
          switch (paintCursor) {
            case "brush":
              cursorToDraw = brushCursor;
              break;
            case "sriracha":
              cursorToDraw = srirachaCursor;
              break;
            case "polish":
              cursorToDraw = polishCursor;
              break;
          }
        } else {
          cursorToDraw = bingCursor;
        }
      }
      drawImageToScale(cursorToDraw, simMousePos.x, simMousePos.y);
    }
  }

  class Button {
    constructor(buttonDefaultImg, buttonHover, xPos, yPos, hoverBounds) {
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
      this.hoverBounds = hoverBounds;
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
      if (this.hoverBounds) {
        this.mouseInBounds =
          this.interactive &&
          !currentlyAnimating &&
          this.isPointAboveLine(
            mouse_x,
            mouse_y,
            this.hoverBounds[0] * scaleRatio,
            this.hoverBounds[1] * scaleRatio,
            this.hoverBounds[2] * scaleRatio,
            this.hoverBounds[3] * scaleRatio
          ) &&
          this.isPointLeftOfLine(
            mouse_x,
            mouse_y,
            this.hoverBounds[2] * scaleRatio,
            this.hoverBounds[3] * scaleRatio,
            this.hoverBounds[4] * scaleRatio,
            this.hoverBounds[5] * scaleRatio
          ) &&
          !this.isPointAboveLine(
            mouse_x,
            mouse_y,
            this.hoverBounds[4] * scaleRatio,
            this.hoverBounds[5] * scaleRatio,
            this.hoverBounds[6] * scaleRatio,
            this.hoverBounds[7] * scaleRatio
          ) &&
          !this.isPointLeftOfLine(
            mouse_x,
            mouse_y,
            this.hoverBounds[6] * scaleRatio,
            this.hoverBounds[7] * scaleRatio,
            this.hoverBounds[0] * scaleRatio,
            this.hoverBounds[1] * scaleRatio
          );
      } else {
        this.mouseInBounds =
          this.interactive &&
          !currentlyAnimating &&
          mouse_x > this.x * scaleRatio &&
          mouse_x < this.x * scaleRatio + this.width * scaleRatio &&
          mouse_y > this.y * scaleRatio &&
          mouse_y < this.y * scaleRatio + this.height * scaleRatio;
      }
      return this.mouseInBounds;
    }

    isPointAboveLine(p1, p2, x1, y1, x2, y2) {
      let m = (y2 - y1) / (x2 - x1);
      let b = y1 - m * x1;
      return p2 > m * p1 + b ? true : false;
    }

    isPointLeftOfLine(p1, p2, x1, y1, x2, y2) {
      let m = (y2 - y1) / (x2 - x1);
      let b = y1 - m * x1;
      if (m > 0) {
        return p2 > m * p1 + b ? true : false;
      } else {
        return p2 < m * p1 + b ? true : false;
      }
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
    constructor(defaultImg, hoverImg, xPos, yPos, xRange, yRange) {
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

      this.xRange = xRange;
      this.yRange = yRange;
      let _this = this;

      //once the single mousedown event, this item drags everywhere until we drop it
      thisCanvas.addEventListener("mousedown", function (e) {
        if (_this.mouseInBounds) {
          draggingStickers.push(_this);
          _this.dragging = true;
          currentlyDragging = true;
          paintCursor = "none";
          game4_paintColor = "none";
          clickedObjects.forEach(function (value) {
            value.intendingToClick = false;
            clickedObjects = [];
          });
        }
      });

      thisCanvas.addEventListener("mouseup", function (e) {
        // If dropped in the target area, then it's done
        if (_this.mouseInBounds) {
          paintCursor = "none";
          game4_paintColor = "none";
          draggingStickers = [];
          _this.dragging = false;
          currentlyDragging = false;
          if (
            mouse_x > xRange[0] * scaleRatio &&
            mouse_x < xRange[1] * scaleRatio &&
            mouse_y > yRange[0] * scaleRatio &&
            mouse_y < yRange[1] * scaleRatio
          ) {
            _this.interactive = false;
            dingSound.start();
            //Snap it into position if we don't make it disappear
            _this.xCurrent = Math.floor(
              (mouse_x - _this.width / 2) / scaleRatio
            );
            _this.yCurrent = Math.floor(
              (mouse_y - _this.height / 2) / scaleRatio
            );

            let newStickerSprite = new Draggable(
              _this.buttonDefault,
              _this.buttonDefault,
              _this.x,
              _this.y,
              _this.xRange,
              _this.yRange
            );
            stickerSprites.push(newStickerSprite);
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
    p.noLoop();
    document.addEventListener("navigateFwd", (e) => {
      if (currentSceneNum == thisSceneNum) {
        gameEntered = true;
        p.loop();
      }
    });
    document.addEventListener("navigateBack", (e) => {
      if (currentSceneNum == thisSceneNum + 1) {
        gameEntered = true;
        p.loop();
      }
    });
    //Navigation stuff
    rightButton = new Button(button_r_up, button_r_down, 503, 407);
    leftButton = new Button(button_l_up, button_l_down, 37, 407);
    restartButton = new Button(restart, restart_h, 20, 20);

    restartButton.addClickEvent(function () {
      if (!currentlyAnimating) {
        document.dispatchEvent(restartGameEvent);
      }
    });
    rightButton.addClickEvent(function (e) {
      if (currentlyAnimating == false) {
        harpTransitionOutSound.start();
        // We need to hide this.
        storyCanvas.style.visibility = "visible";
        storyCanvas.style.opacity = 1;
        document.dispatchEvent(navigateFwdStoryEvent);
        window.setTimeout(function () {
          thisCanvas.style.visibility = "hidden";
          game4acanvas.style.visibility = "hidden";
          storyMode = true;
          p.noLoop();
          hideCanvas();
        }, 1000);
        storyMode = true;
      }
    });
    leftButton.addClickEvent(function (e) {
      if (currentlyAnimating == false) {
        harpTransitionOutSound.start();
        // We need to hide this.
        storyCanvas.style.visibility = "visible";
        storyCanvas.style.opacity = 1;
        document.dispatchEvent(navigateBackStoryEvent);
        window.setTimeout(function () {
          thisCanvas.style.visibility = "hidden";
          game4acanvas.style.visibility = "hidden";
          storyMode = true;
          p.noLoop();
          hideCanvas();
        }, 1000);
        storyMode = true;
      }
    });
  }

  function hideCanvas() {
    game4_soundtrack.stop();
    gameStarted = false;
    gameEntered = false;
    paintCursor = "none";
    game4_paintColor = "none";
    //Add things we want to do when we leave this scene
  }

  p.windowResized = function () {
    calculateCanvasDimensions();
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

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

  function playGameVoiceover(sound, time, callback) {
    if (gameVoiceoverOn) {
      currentlyAnimating = true;
      setTimeout(function () {
        game4_soundtrack.start();
        setTimeout(function () {
          sound.start();
        }, 1000);
      }, voiceoverDelay * 1000);

      setTimeout(function () {
        currentlyAnimating = false;
        if (callback) {
          callback();
        }
      }, (time + voiceoverDelay) * 1000);
    }
  }
};

new p5(game4, "canvas-game4");

// js for art canvases

// Sounds for painting

var game4a = function (p) {
  let thisCanvas;
  let canvasRatio = canvasWidth / canvasHeight;
  let thisSceneNum = 4;

  let game4canvasInitialized = false;

  let bg = "yellow";

  let drawing = false;

  let paintColors = [];

  let currentColorImg;

  let density = 1;

  let gameEntered = false;

  let case_base;

  //Have a function that plays the sound at an interval as long as we're holding the mouse down...

  // let getRandomPaintSound = function () {
  //   return paintSounds[Math.floor(Math.random() * paintSounds.length)];
  // };
  p.preload = function () {
    //Preload whatever needs to be preloaded
    case_base = p.loadImage("assets/img/game4/case-base.png");
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game4acanvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game4acanvas.classList.add("game4-artCanvas");
    game4acanvas.classList.add("gameCanvas");
    game4acanvas.classList.add("game4");
    game4acanvas.id = "game4a";
    thisCanvas = game4acanvas;
    p.noSmooth();
    setupNavigation();
    // p.background("white");
    drawImageToScale(case_base, 0, 0);

    //Initialize Game N Sprites
    for (let i = 0; i < 10; i++) {
      paintColors.push(p.loadImage(`assets/img/game4/paintblob${i}.png`));
    }
  };

  let soundInterval;

  // Change paint color based on main canvas event
  document.addEventListener("changeColor", (e) => {
    switch (game4_paintColor) {
      case "pink":
        currentColorImg = paintColors[0];
        density = 1;
        break;
      case "orange":
        currentColorImg = paintColors[1];
        density = 1;
        break;
      case "yellow":
        currentColorImg = paintColors[2];
        density = 1;
        break;
      case "green":
        currentColorImg = paintColors[3];
        density = 1;
        break;
      case "blue":
        currentColorImg = paintColors[4];
        density = 1;
        break;
      case "purple":
        currentColorImg = paintColors[5];
        density = 1;
        break;
      case "black":
        currentColorImg = paintColors[6];
        density = 1;
        break;
      case "white":
        currentColorImg = paintColors[7];
        density = 1;
        break;
      case "sriracha":
        currentColorImg = paintColors[8];
        density = 1;

        break;
      case "polish":
        currentColorImg = paintColors[9];
        density = 0.2;
        break;
      default:
        currentColorImg = paintColors[0];
        density = 1;
    }
  });

  p.draw = function () {
    //Do this once waiting for main canvas to intialize
    if (game4canvas && !game4canvasInitialized) {
      game4canvas.addEventListener("mousedown", function () {
        let simMousePos = {
          x: Math.floor((p.mouseX - 0.035 * canvasWidth) / scaleRatio),
          y: Math.floor((p.mouseY - 0.01 * canvasHeight) / scaleRatio),
        };
        //check if in bounds of flute case
        if (
          simMousePos.x > 214 &&
          simMousePos.x < 577 &&
          simMousePos.y > 166 &&
          simMousePos.y < 318
        ) {
          drawing = true;
          // Create interval for sound
          chosenPaintSound.start();
          soundInterval = setInterval(function () {
            chosenPaintSound.start();
          }, 800);
        }
      });
      game4canvas.addEventListener("mouseup", function () {
        // If a paint color is selected and you mouse up, stop drawing (creating blobs)
        if (game4_paintColor !== "none") {
          drawing = false;
          clearInterval(soundInterval);
        }
      });
      game4canvasInitialized = true;
    }

    // draw whatever needed
    if (currentColorImg && drawing) {
      let simMousePos = {
        x: Math.floor((p.mouseX - 0.035 * canvasWidth) / scaleRatio),
        y: Math.floor((p.mouseY - 0.01 * canvasHeight) / scaleRatio),
      };
      let drawThisFrame = true;
      if (density < 1) {
        drawThisFrame = Math.random() < density ? true : false;
      }
      if (drawThisFrame) {
        drawImageToScale(currentColorImg, simMousePos.x, simMousePos.y);
      }
    }
  };

  // HELPERS

  function setupNavigation() {
    p.noLoop();
    document.addEventListener("navigateFwd", (e) => {
      if (currentSceneNum == thisSceneNum) {
        gameEntered = true;
        p.loop();
      }
    });
    document.addEventListener("navigateBack", (e) => {
      if (currentSceneNum == thisSceneNum + 1) {
        gameEntered = true;
        p.loop();
      }
    });
  }

  p.windowResized = function () {
    calculateCanvasDimensions();
    p.resizeCanvas(canvasWidth, canvasHeight);
    if (case_base) {
      drawImageToScale(case_base, 0, 0);
    }
  };

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

new p5(game4a, "canvas-game4a");
