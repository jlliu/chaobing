// Game 1: Cleaning Room

let game1canvas;

var game1 = function (p) {
  let thisSceneNum = 1;
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let restartButton;
  let cursor;
  let cursorState = "default";

  let gameEntered = false;
  let gameStarted = false;

  let currentlyAnimating = false;
  let timedAnimationIndex = 0;
  let currentlyDragging = false;

  let clickedObjects = [];

  let discoAnimation = [];
  let discoAnimationImgs = [];

  let drawerSprite,
    lampSprite,
    posterSprite,
    blanketSprite,
    pandaSprite,
    sockSprite,
    shirtSprite,
    discoSprite,
    pillowSprite;

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

    restart = p.loadImage("assets/UI/buttons/restart.png");
    restart_h = p.loadImage("assets/UI/buttons/restart-h.png");

    //game 1 assets
    g1_bg = p.loadImage("assets/img/game1/bg.png");
    blanket = p.loadImage("assets/img/game1/blanket.png");
    blanket2 = p.loadImage("assets/img/game1/blanket2.png");
    blanket_h = p.loadImage("assets/img/game1/blanket-h.png");
    drawer = p.loadImage("assets/img/game1/drawer.png");
    drawer2 = p.loadImage("assets/img/game1/drawer2.png");
    drawer_h = p.loadImage("assets/img/game1/drawer-h.png");
    pillow = p.loadImage("assets/img/game1/pillow.png");
    pillow_h = p.loadImage("assets/img/game1/pillow-h.png");
    poster = p.loadImage("assets/img/game1/poster.png");
    poster2 = p.loadImage("assets/img/game1/poster2.png");
    poster_h = p.loadImage("assets/img/game1/poster-h.png");
    shirt = p.loadImage("assets/img/game1/shirt.png");
    shirt_h = p.loadImage("assets/img/game1/shirt-h.png");
    sock = p.loadImage("assets/img/game1/sock.png");
    sock_h = p.loadImage("assets/img/game1/sock-h.png");
    panda = p.loadImage("assets/img/game1/panda.png");
    panda_h = p.loadImage("assets/img/game1/panda-h.png");

    //animated assets
    lamp_1 = p.loadImage("assets/img/game1/lamp1.png");
    lamp_2 = p.loadImage("assets/img/game1/lamp2.png");
    lamp_3 = p.loadImage("assets/img/game1/lamp3.png");
    lamp_4 = p.loadImage("assets/img/game1/lamp4.png");
    lamp_5 = p.loadImage("assets/img/game1/lamp5.png");

    lantern = p.loadImage("assets/img/game1/lantern.png");
    disco_spritesheet = p.loadImage(
      "assets/img/game1/discoAnimationSpritesheet.png"
    );
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game1canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game1canvas.classList.add("gameCanvas");
    game1canvas.classList.add("game1");
    game1canvas.id = "game1";
    p.noSmooth();

    setupNavigation();
    cursor = new Cursor();

    //Initialize Game 1 Sprites

    drawerSprite = new Button(drawer, drawer_h, 438, 134);
    drawerSprite.addClickEvent(function (e) {
      drawerSprite.buttonDefault = drawer2;
      drawerSprite.buttonHover = drawer2;
      drawerSprite.interactive = false;
      drawerSound.start();
    });
    posterSprite = new Button(poster, poster_h, 66, 29);
    posterSprite.addClickEvent(function (e) {
      posterSprite.buttonDefault = poster2;
      posterSprite.buttonHover = poster2;
      posterSprite.interactive = false;
      pageFlipSound.start();
    });
    blanketSprite = new Button(blanket, blanket_h, 169, 177);
    blanketSprite.addClickEvent(function (e) {
      blanketSprite.buttonDefault = blanket2;
      blanketSprite.buttonHover = blanket2;
      blanketSprite.interactive = false;
      toySqueakSound.start();
    });
    pillowSprite = new Draggable(
      pillow,
      pillow_h,
      510,
      250,
      276,
      148,
      [169, 459],
      [101, 394],
      toySqueakSound
    );
    shirtSprite = new Draggable(
      shirt,
      shirt_h,
      43,
      300,
      null,
      null,
      [46, 191],
      [139, 271],
      burnSound
    );
    sockSprite = new Draggable(
      sock,
      sock_h,
      13,
      270,
      null,
      null,
      [46, 191],
      [139, 271],
      burnSound
    );
    pandaSprite = new Draggable(
      panda,
      panda_h,
      460,
      351,
      230,
      156,
      [169, 459],
      [101, 394],
      toySqueakSound
    );

    //Animated buttons
    lampSprite = new Button(lamp_1, lamp_1, 457, 37);
    lampAnimation = [
      lamp_1, //1
      lamp_2, //2
      lamp_3, //3
      lamp_1, //4
      lamp_4, //5
      lamp_5, //6
      lamp_4, //7
      lamp_1, //8
      lamp_2, //9
      lamp_3, //10
      lamp_2, //11
      lamp_1, //12
    ];
    lampSprite.addClickEvent(function (e) {
      if (!currentlyAnimating) {
        intervalAnimation(lampSprite, lampAnimation, 100);
        boingSound.start();
      }
    });
    lanternSprite = new Button(lantern, lantern, 269, 0);
    for (var i = 0; i < 16; i++) {
      let height = 480;
      let img = disco_spritesheet.get(0, height * i, 640, 480);
      discoAnimationImgs.push(img);
    }

    discoSprite = new Button(
      discoAnimationImgs[0],
      discoAnimationImgs[0],
      0,
      0
    );
    discoSprite.visible = false;

    discoAnimation = [
      discoAnimationImgs[0], //1
      discoAnimationImgs[1], //2
      discoAnimationImgs[2], //3
      discoAnimationImgs[3], //4
      discoAnimationImgs[4], //5
      discoAnimationImgs[5], //6
      discoAnimationImgs[6], //7
      discoAnimationImgs[7], //8
      discoAnimationImgs[8], //9
      discoAnimationImgs[9], //10
      discoAnimationImgs[10], //11
      discoAnimationImgs[11], //12
      discoAnimationImgs[12], //13
      discoAnimationImgs[13], //14
      discoAnimationImgs[13], //14
      discoAnimationImgs[14], //15
      discoAnimationImgs[14], //15
      discoAnimationImgs[15], //16
      discoAnimationImgs[15], //16
      discoAnimationImgs[13], //14
      discoAnimationImgs[13], //14
      discoAnimationImgs[14], //15
      discoAnimationImgs[14], //15
      discoAnimationImgs[15], //16
      discoAnimationImgs[15], //16
      discoAnimationImgs[13], //14
      discoAnimationImgs[13], //14
      discoAnimationImgs[14], //15
      discoAnimationImgs[14], //15
      discoAnimationImgs[15], //16
      discoAnimationImgs[15], //16
      discoAnimationImgs[14], //15
      discoAnimationImgs[13], //14
      discoAnimationImgs[12], //13
      discoAnimationImgs[11], //12
      discoAnimationImgs[10], //11
      discoAnimationImgs[9], //10
      discoAnimationImgs[8], //9
      discoAnimationImgs[7], //8
      discoAnimationImgs[6], //7
      discoAnimationImgs[5], //6
      discoAnimationImgs[4], //5
      discoAnimationImgs[3], //4
      discoAnimationImgs[2], //3
      discoAnimationImgs[1], //2
      discoAnimationImgs[0], //1
    ];
    lanternSprite.addClickEvent(function (e) {
      if (!currentlyAnimating) {
        disco_soundtrack.start();
        game1_soundtrack.stop();
        lanternSprite.visible = false;
        discoSprite.visible = true;
        intervalAnimation(discoSprite, discoAnimation, 210, function () {
          discoSprite.visible = false;
          lanternSprite.visible = true;
          game1_soundtrack.start();
        });
      }
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
    if (gameEntered && !gameStarted) {
      gameStarted = true;
      playGameVoiceover(game1_voiceover, 16);
    }
    if (gameStarted) {
    }

    p.image(g1_bg, 0, 0, canvasWidth, canvasHeight);

    drawerSprite.display();
    posterSprite.display();
    blanketSprite.display();
    pillowSprite.display();
    shirtSprite.display();
    sockSprite.display();
    pandaSprite.display();
    lampSprite.display();
    lanternSprite.display();
    discoSprite.display();

    // Navigation
    rightButton.display();
    leftButton.display();
    restartButton.display();
  }

  function resetPositions() {
    pandaSprite.reset();
    sockSprite.reset();
    shirtSprite.reset();
    pillowSprite.reset();
    blanketSprite.reset();
    posterSprite.reset();
    drawerSprite.reset();
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
      this.originalImg = buttonDefaultImg;
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
        this.interactive &&
        !currentlyAnimating &&
        mouse_x > this.x * scaleRatio &&
        mouse_x < this.x * scaleRatio + this.width * scaleRatio &&
        mouse_y > this.y * scaleRatio &&
        mouse_y < this.y * scaleRatio + this.height * scaleRatio;
      return this.mouseInBounds;
    }

    reset() {
      this.interactive = true;
      this.buttonDefault = this.originalImg;
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
      yRange,
      soundEffect
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
            soundEffect.start();
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

    reset() {
      this.xCurrent = this.x;
      this.yCurrent = this.y;
      this.visible = true;
      this.interactive = true;
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
        // currentSceneNum++;
        harpTransitionOutSound.start();
        // We need to hide this.
        storyCanvas.style.visibility = "visible";
        storyCanvas.style.opacity = 1;
        document.dispatchEvent(navigateFwdStoryEvent);
        window.setTimeout(function () {
          game1canvas.style.visibility = "hidden";
          storyMode = true;
          hideCanvas();
          p.noLoop();
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
          game1canvas.style.visibility = "hidden";
          storyMode = true;
          hideCanvas();
          p.noLoop();
        }, 1000);
        storyMode = true;
      }
    });
  }

  function hideCanvas() {
    //Add things we want to do when we leave this scene
    gameEntered = false;
    gameStarted = false;
    resetPositions();
    game1_soundtrack.stop();
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

  // Play voiceover and disable interactions for time # of seconds
  function playGameVoiceover(sound, time, callback) {
    if (gameVoiceoverOn) {
      currentlyAnimating = true;
      setTimeout(function () {
        game1_soundtrack.start();
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

new p5(game1, "canvas-game1");
