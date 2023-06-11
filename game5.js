// Game N: Template for any game number

let game5canvas;

var game5 = function (p) {
  let thisCanvas;
  let thisSceneNum = 5;
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let restartButton;
  let cursor;
  let cursorState = "default";

  let currentlyAnimating = false;
  let timedAnimationIndex = 0;
  let currentlyDragging = false;

  let clickedObjects = [];

  let currentPhraseNum = 0;

  let numCorrect = 0;

  let gameStarted = false;
  let gameEntered = false;

  // list of list
  // let phraseImages = new Array(3);

  // Phrases is an object,
  // keyed by #
  // with values of the Draggable sprites
  // and the bg
  // and an animation Frames
  let phrases = [];

  p.preload = function () {
    //Preload a background here
    // g5_bg = p.loadImage("assets/img/game5/bg.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded
    const initializedInfo = {
      piecesImg: [],
      bgImg: null,
      animationImg: [],
      piecesSprites: [],
      animationSprite: null,
    };
    phrases[0] = JSON.parse(JSON.stringify(initializedInfo));
    for (let i = 0; i < 8; i++) {
      phrases[0].piecesImg.push({
        default: p.loadImage(`assets/img/game5/phrase0-${i}.png`),
        hover: p.loadImage(`assets/img/game5/phrase0-${i}-h.png`),
      });
    }
    phrases[0].bgImg = p.loadImage("assets/img/game5/base0.png");
    for (let i = 0; i < 9; i++) {
      phrases[0].animationImg.push(
        p.loadImage(`assets/img/game5/animation0-${i}.png`)
      );
    }

    // Phrase 2
    phrases[1] = JSON.parse(JSON.stringify(initializedInfo));

    for (let i = 0; i < 9; i++) {
      phrases[1].piecesImg.push({
        default: p.loadImage(`assets/img/game5/phrase1-${i}.png`),
        hover: p.loadImage(`assets/img/game5/phrase1-${i}-h.png`),
      });
    }
    phrases[1].bgImg = p.loadImage("assets/img/game5/base1.png");
    for (let i = 0; i < 14; i++) {
      phrases[1].animationImg.push(
        p.loadImage(`assets/img/game5/animation1-${i}.png`)
      );
    }
    // Phrase 3
    phrases[2] = JSON.parse(JSON.stringify(initializedInfo));

    for (let i = 0; i < 7; i++) {
      phrases[2].piecesImg.push({
        default: p.loadImage(`assets/img/game5/phrase2-${i}.png`),
        hover: p.loadImage(`assets/img/game5/phrase2-${i}-h.png`),
      });
    }
    phrases[2].bgImg = p.loadImage("assets/img/game5/base2.png");
    for (let i = 0; i < 11; i++) {
      phrases[2].animationImg.push(
        p.loadImage(`assets/img/game5/animation2-${i}.png`)
      );
    }
  };

  let locations = [
    [
      { x0: 24, y0: 40, x1: 132, y1: 132 },
      { x0: -9, y0: 225, x1: 135, y1: 189 },
      { x0: 309, y0: 27, x1: 105, y1: 231 },
      { x0: 568, y0: 46, x1: 108, y1: 266 },
      { x0: 539, y0: 258, x1: 195, y1: 269 },
      { x0: 350, y0: 396, x1: 360, y1: 163 },
      { x0: 169, y0: 370, x1: 446, y1: 151 },
      { x0: 476, y0: 370, x1: 451, y1: 270 },
    ], //phrase 1
    [
      { x0: 167, y0: 370, x1: 118, y1: 159 },
      { x0: 17, y0: 38, x1: 147, y1: 206 },
      { x0: 394, y0: 0, x1: 138, y1: 246 },
      { x0: 538, y0: 153, x1: 169, y1: 139 },
      { x0: 511, y0: -37, x1: 346, y1: 147 },
      { x0: 367, y0: 383, x1: 374, y1: 202 },
      { x0: -19, y0: 308, x1: 458, y1: 146 },
      { x0: 276, y0: 3, x1: 471, y1: 197 },
      { x0: 0, y0: 168, x1: 452, y1: 227 },
    ], //phrase 2
    [
      { x0: 522, y0: 35, x1: 73, y1: 175 },
      { x0: 543, y0: 276, x1: 42, y1: 204 },
      { x0: 193, y0: 6, x1: 231, y1: 162 },
      { x0: 340, y0: 386, x1: 189, y1: 198 },
      { x0: 394, y0: 0, x1: 189, y1: 263 },
      { x0: 213, y0: 370, x1: 349, y1: 188 },
      { x0: -5, y0: 9, x1: 503, y1: 159 },
    ], //phrase 3
  ];

  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game5canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game5canvas.classList.add("gameCanvas");
    game5canvas.classList.add("game5");
    game5canvas.id = "game5";
    thisCanvas = game5canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game N Sprites

    for (let i = 0; i < phrases.length; i++) {
      for (let j = 0; j < phrases[i].piecesImg.length; j++) {
        phrases[i].piecesSprites.push(
          new Draggable(
            phrases[i].piecesImg[j].default,
            phrases[i].piecesImg[j].hover,
            locations[i][j].x0,
            locations[i][j].y0,
            locations[i][j].x1,
            locations[i][j].y1,
            [locations[i][j].x1 - 20, locations[i][j].x1 + 20],
            [locations[i][j].y1 - 20, locations[i][j].y1 + 20]
          )
        );
      }
      phrases[i].animationSprite = new Button(
        phrases[i].animationImg[0],
        phrases[i].animationImg[0],
        0,
        0
      );
      phrases[i].animationSprite.visible = false;
    }
  };

  resetPhrases = function () {
    for (let i = 0; i < phrases.length; i++) {
      for (let j = 0; j < phrases[i].piecesSprites.length; j++) {
        let thisSprite = phrases[i].piecesSprites[j];
        thisSprite.xCurrent = locations[i][j].x0;
        thisSprite.yCurrent = locations[i][j].y0;
        thisSprite.interactive = true;
      }
    }
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
      playGameVoiceover(game5_voiceover, 15);
    }

    let thisBg = phrases[currentPhraseNum].bgImg;
    p.image(thisBg, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    let thisPhrase = phrases[currentPhraseNum];
    for (let i = 0; i < thisPhrase.piecesSprites.length; i++) {
      thisPhrase.piecesSprites[i].display();
    }
    thisPhrase.animationSprite.display();

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
            _this.xCurrent > xRange[0] &&
            _this.xCurrent < xRange[1] &&
            _this.yCurrent > yRange[0] &&
            _this.yCurrent < yRange[1]
          ) {
            _this.interactive = false;
            pageFlipSound.start();
            //Figure out if we completed the puzzle
            numCorrect++;
            if (numCorrect == phrases[currentPhraseNum].piecesSprites.length) {
              if (!currentlyAnimating) {
                playDefinitionVoiceover(
                  game5_definitions[currentPhraseNum].sound,
                  game5_definitions[currentPhraseNum].duration.false,
                  1
                );
                let animationSprite = phrases[currentPhraseNum].animationSprite;
                animationSprite.visible = true;
                intervalAnimation(
                  animationSprite,
                  phrases[currentPhraseNum].animationImg,
                  1000,
                  function () {
                    animationSprite.visible = false;
                    currentPhraseNum = (currentPhraseNum + 1) % 3;
                    if (currentPhraseNum == 0) {
                      resetPhrases();
                    }
                  }
                );
                // boingSound.start();
              }
              // });
              numCorrect = 0;
            }
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
          storyMode = true;
          p.noLoop();
          hideCanvas();
        }, 1000);
        storyMode = true;
      }
    });
  }

  function hideCanvas() {
    //Add things we want to do when we leave this scene
    gameStarted = false;
    gameEntered = false;
    currentPhraseNum = 0;
    numCorrect = 0;
    resetPhrases();
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
        sound.start();
      }, voiceoverDelay * 1000);

      setTimeout(function () {
        currentlyAnimating = false;
        if (callback) {
          callback();
        }
      }, (time + voiceoverDelay) * 1000);
    }
  }

  function playDefinitionVoiceover(sound, time, delay, callback) {
    setTimeout(function () {
      sound.start();
    }, delay * 1000);
    setTimeout(function () {
      if (callback) {
        callback();
      }
    }, (time + delay) * 1000);
  }
};

new p5(game5, "canvas-game5");
