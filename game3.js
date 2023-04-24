// Game N: Template for any game number

let game3canvas;

var game3 = function (p) {
  let thisCanvas;
  let thisSceneNum = 3;
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

  let mousedOverSprites = [];

  // create an object of key sprites
  // keyed by their musical note
  let blackKeys = {};
  let whiteKeys = {};

  let hoveredSprites = {};

  let clickedSprites = [];

  let currentSequence = 0;
  let sequenceIndex = 0;
  let sequences = [
    [
      { note: "Bb4", duration: 1000 },
      { note: "G5", duration: 4000 },
    ],
    [
      { note: "Bb4", duration: 1000 },
      { note: "G5", duration: 4000 },
      { note: "F5", duration: 1000 },
      { note: "G5", duration: 1000 },
      { note: "F5", duration: 3000 },
      { note: "Eb5", duration: 2000 },
    ],
    [
      { note: "Bb4", duration: 1000 },
      { note: "G5", duration: 2000 },
      { note: "C5", duration: 200 },
      { note: "Db5", duration: 200 },
      { note: "C5", duration: 200 },
      { note: "B4", duration: 200 },
      { note: "C5", duration: 200 },
      { note: "C6", duration: 2000 },
      { note: "G5", duration: 1000 },
      { note: "Bb5", duration: 3000 },
      { note: "Ab5", duration: 2000 },
    ],
    [
      { note: "G5", duration: 1000 },
      { note: "F5", duration: 3000 },
      { note: "G5", duration: 2000 },
      { note: "D5", duration: 1000 },
      { note: "Eb5", duration: 3000 },
      { note: "C5", duration: 3000 },
    ],
    [
      { note: "Bb4", duration: 1000 },
      { note: "D6", duration: 1000 },
      { note: "C6", duration: 1000 },
      { note: "Bb5", duration: 500 },
      { note: "Ab5", duration: 500 },
      { note: "G5", duration: 500 },
      { note: "Ab5", duration: 500 },
      { note: "C5", duration: 500 },
      { note: "D5", duration: 500 },
      { note: "Eb5", duration: 3000 },
    ],
  ];

  p.preload = function () {
    //Preload a background here
    g3_bg = p.loadImage("assets/img/game3/bg.png");

    whiteKey = p.loadImage("assets/img/game3/whitekey.png");
    blackKey = p.loadImage("assets/img/game3/blackkey.png");
    whiteKey_h = p.loadImage("assets/img/game3/whitekey-hover.png");
    blackKey_h = p.loadImage("assets/img/game3/blackkey-hover.png");
    whiteKey_p = p.loadImage("assets/img/game3/whitekey-pressed.png");
    blackKey_p = p.loadImage("assets/img/game3/blackkey-pressed.png");
    whiteKey_w = p.loadImage("assets/img/game3/whitekey-wrong.png");
    blackKey_w = p.loadImage("assets/img/game3/blackkey-wrong.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    calculateCanvasDimensions(p);
    game3canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game3canvas.classList.add("gameCanvas");
    game3canvas.id = "game3";
    thisCanvas = game3canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game Sprites
    let whiteKey;
    // setupKeys();

    setupKey("Ab4", "black", -28, 91, false);
    setupKey("A4", "white", 0, 120, true);
    setupKey("Bb4", "black", 34, 91, true);
    setupKey("B4", "white", 58, 120, true);
    setupKey("C5", "white", 117, 120, true);
    setupKey("Db5", "black", 153, 91, true);
    setupKey("D5", "white", 175, 120, true);
    setupKey("Eb5", "black", 214, 91, true);
    setupKey("E5", "white", 233, 120, true);
    setupKey("F5", "white", 291, 120, true);
    setupKey("Gb5", "black", 315, 91, true);
    setupKey("G5", "white", 349, 120, true);
    setupKey("Ab5", "black", 376, 91, true);
    setupKey("A5", "white", 407, 120, true);
    setupKey("Bb5", "black", 443, 91, true);
    setupKey("B5", "white", 465, 120, true);
    setupKey("C6", "white", 524, 120, true);
    setupKey("Db6", "black", 553, 91, true);
    setupKey("D6", "white", 582, 120, true);
    setupKey("Eb6", "black", 621, 91, false);
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
    p.image(g3_bg, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    // DISPLAY THE BLACK KEYS ON TOP OF THE WHITE KEYS
    Object.keys(whiteKeys).forEach(function (key) {
      whiteKeys[key].detectMouse();
    });
    Object.keys(blackKeys).forEach(function (key) {
      blackKeys[key].detectMouse();
    });
    //Once we have list of detected objects, find the one we truly want to hover over

    let lastItem;
    if (mousedOverSprites.length) {
      lastItem = mousedOverSprites[mousedOverSprites.length - 1];
      lastItem.hovering = true;
    }
    if (clickedSprites.includes(lastItem)) {
      lastItem.playNote();
    }

    Object.keys(whiteKeys).forEach(function (key) {
      whiteKeys[key].display();
    });
    Object.keys(blackKeys).forEach(function (key) {
      blackKeys[key].display();
    });

    mousedOverSprites = [];
    clickedSprites = [];
    if (lastItem) {
      lastItem.hovering = false;
    }
    // Navigation
    rightButton.display();
    leftButton.display();
  }

  //creates a key sprite
  function setupKey(note, color, x, y, playable) {
    let imgToDraw, hoverImg, pressedImg;
    if (color == "black") {
      imgToDraw = blackKey;
      hoverImg = blackKey_h;
      pressedImg = blackKey_p;
      wrongImg = blackKey_w;
    } else {
      imgToDraw = whiteKey;
      hoverImg = whiteKey_h;
      pressedImg = whiteKey_p;
      wrongImg = whiteKey_w;
    }
    let thisKey = new ButtonKey(
      imgToDraw,
      hoverImg,
      pressedImg,
      wrongImg,
      x,
      y
    );
    thisKey.note = note;
    thisKey.interactive = playable;
    if (color == "black") {
      blackKeys[note] = thisKey;
    } else {
      whiteKeys[note] = thisKey;
    }
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

  class ButtonKey {
    constructor(
      buttonDefaultImg,
      buttonHover,
      pressedImg,
      wrongImg,
      xPos,
      yPos
    ) {
      this.x = xPos;
      this.y = yPos;
      this.buttonDefault = buttonDefaultImg;
      this.buttonHover = buttonHover;
      this.buttonPressed = pressedImg;
      this.buttonWrong = wrongImg;
      this.width = buttonDefaultImg.width;
      this.height = buttonDefaultImg.height;
      this.mouseInBounds = false;
      this.interactive = true;
      this.intendingToClick = false;
      this.visible = true;
      this.hovering = false;
      this.pressed = false;
      this.wrong = false;
      let _this = this;
      thisCanvas.addEventListener("mousedown", function (e) {
        if (_this.isMouseInBounds()) {
          _this.intendingToClick = true;
          clickedSprites.push(_this);
        }
      });
    }

    addClickEvent(clickFunction) {
      let _this = this;
      thisCanvas.addEventListener("click", function (e) {
        if (_this.isMouseInBounds() && _this.intendingToClick) {
          clickFunction();
          _this.intendingToClick = false;
          clickedSprites = [];
        }
      });
    }
    playNote(delay) {
      let animationDelay = 300;
      if (delay) {
        animationDelay = delay;
      }
      pianoSampler.triggerAttackRelease([this.note], Tone.now());
      this.pressed = true;
      currentlyAnimating = true;
      let _this = this;

      //Check if this was the correct key for the current sequence
      let correctNote = sequences[currentSequence][sequenceIndex].note;
      if (correctNote == this.note) {
        console.log("CORRECT");
        //Progress sequence, if applicable
        if (sequenceIndex == sequences[currentSequence].length - 1) {
          currentSequence++;
          sequenceIndex = 0;
          setTimeout(function () {
            playSequence(sequences[currentSequence]);
          }, 2000);
          setTimeout(function () {
            _this.pressed = false;
          }, animationDelay);
        } else {
          sequenceIndex++;
          setTimeout(function () {
            _this.pressed = false;
            currentlyAnimating = false;
          }, animationDelay);
        }
      } else {
        console.log("INCORRECT");
        currentlyAnimating = true;
        this.wrong = true;
        setTimeout(function () {
          _this.pressed = false;
          _this.wrong = false;
        }, animationDelay);
        setTimeout(function () {
          playSequence(sequences[currentSequence]);
        }, 2000);

        //Play sequence and Have to repeat!
        sequenceIndex = 0;
      }
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
    detectMouse() {
      this.mouseInBounds =
        this.interactive &&
        !currentlyAnimating &&
        mouse_x > this.x * scaleRatio &&
        mouse_x < this.x * scaleRatio + this.width * scaleRatio &&
        mouse_y > this.y * scaleRatio &&
        mouse_y < this.y * scaleRatio + this.height * scaleRatio;
      if (this.mouseInBounds) {
        mousedOverSprites.push(this);
      }
    }
    display() {
      let imageToDraw;

      if (this.hovering && !currentlyAnimating) {
        imageToDraw = this.buttonHover;
      } else if (this.pressed) {
        if (this.wrong) {
          imageToDraw = this.buttonWrong;
        } else {
          imageToDraw = this.buttonPressed;
        }
      } else {
        imageToDraw = this.buttonDefault;
      }

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

  // HELPERS

  function setupNavigation() {
    p.noLoop();
    document.addEventListener("navigateFwd", (e) => {
      if (currentSceneNum == thisSceneNum) {
        p.loop();
      }
    });
    document.addEventListener("navigateBack", (e) => {
      if (currentSceneNum == thisSceneNum + 1) {
        p.loop();
      }
    });
    //Navigation stuff
    rightButton = new Button(button_r_up, button_r_down, 503, 407);
    leftButton = new Button(button_l_up, button_l_down, 37, 407);
    rightButton.addClickEvent(function (e) {
      if (currentlyAnimating == false) {
        currentSceneNum++;
        harpTransitionOutSound.start();
        // We need to hide this.
        storyCanvas.style.visibility = "visible";
        storyCanvas.style.opacity = 1;
        window.setTimeout(function () {
          thisCanvas.style.visibility = "hidden";
          storyMode = true;
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
        window.setTimeout(function () {
          thisCanvas.style.visibility = "hidden";
          storyMode = true;
          p.noLoop();
        }, 1000);
        storyMode = true;
      }
    });
  }

  p.windowResized = function () {
    calculateCanvasDimensions();
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  p.keyPressed = function () {
    if (!currentlyAnimating) {
      if (p.keyCode === p.LEFT_ARROW) {
        // value = 255;
        playSequence(sequences[0]);
      } else if (p.keyCode === p.RIGHT_ARROW) {
        // value = 0;
        playSequence(sequences[1]);
      }
    }
  };

  // takes in a list of object of notes names and duration
  function playSequence(musicInfo, callback) {
    let timeCount = 0;
    let gain = 0.6;
    let pauseBefore = 0;
    // let currentlyAnimating = true;

    musicInfo.forEach(function (noteInfo, index) {
      let noteToPlay = noteInfo.note;
      let duration = noteInfo.duration;
      let delay = 0;
      if (index !== 0) {
        delay = musicInfo[index - 1].duration;
      }
      timeCount = timeCount + delay;
      //actually need the time count of the previous note
      let keySprite;
      if (blackKeys[noteToPlay]) {
        keySprite = blackKeys[noteToPlay];
      } else if (whiteKeys[noteToPlay]) {
        keySprite = whiteKeys[noteToPlay];
      }
      setTimeout(function () {
        pianoSampler.triggerAttackRelease([noteToPlay], Tone.now());
        keySprite.pressed = true;
        currentlyAnimating = true;
      }, timeCount * gain);
      setTimeout(function () {
        keySprite.pressed = false;
      }, (timeCount + duration) * gain);
    });
    setTimeout(function () {
      currentlyAnimating = false;
      if (callback) {
        callback();
      }
    }, (timeCount + musicInfo[musicInfo.length - 1].duration) * gain);
  }

  // the problem is multiple animations on top of each other

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
};

new p5(game3, "canvas-game3");
