// Game N: Template for any game number

let game6canvas;

var game6 = function (p) {
  let thisCanvas;
  let thisSceneNum = 6;
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

  let gameEntered = false;
  let gameStarted = false;

  let letterToNumber = {
    a: 2,
    b: 2,
    c: 2,
    d: 3,
    e: 3,
    f: 3,
    g: 4,
    h: 4,
    i: 4,
    j: 5,
    k: 5,
    l: 5,
    m: 6,
    n: 6,
    o: 6,
    p: 7,
    q: 7,
    r: 7,
    s: 7,
    t: 8,
    u: 8,
    v: 8,
    w: 9,
    x: 9,
    y: 9,
    z: 9,
    " ": "#",
    ".": "1-s",
    ",": "2-s",
    "!": "3-s",
    "?": "4-s",
    _: "5-s",
    ":": "6-s",
    ";": "7-s",
    "(": "8-s",
    ")": "9-s",
    "^": "0-s",
    "*": "#-s",
  };
  // list of convos grouped by phase
  let convoInfo = [
    [
      {
        in: "hello <3",
        out: "hi!",
      },
      { in: "cant wait til next summer", out: "me too" },
      { in: "^_^", out: "^.^" },
    ],
    [
      {
        in: "i love you",
        out: "i love you more",
      },
      {
        in: "i love you times infinity",
        out: "ily to the power of infinity",
      },
      {
        in: "*kiss*",
        out: "*blushes*",
      },
    ],
    [
      {
        in: ";_;",
        out: "whats wrong?",
      },
      {
        in: ";__;",
        out: ";___;",
      },
      {
        in: "i'm breaking up with you",
        out: "what?",
      },
      {
        in: "it's over..",
        out: "i dont understand",
      },
    ],
  ];

  let currentPart = 0;

  let currentConvoIndex = 0;

  let phoneButtons = [];

  let currentPhrase = "";

  let correctSequence = [];
  let attemptedSequence = [];
  let sequenceIndex = 0;

  let displayInText = false;

  let displayOutText = false;

  let symbolsOpen = false;

  let outTextShown = "";

  let numTimesFinished = 0;
  // let textSoFar = "";

  let g6_bgs;

  p.preload = function () {
    //Preload a background here
    g6_bgs = [
      p.loadImage("assets/img/game6/bg-1.png"),
      p.loadImage("assets/img/game6/bg-2.png"),
      p.loadImage("assets/img/game6/bg-3.png"),
    ];

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded
    // phone button imgs
    phoneButtonImg_1 = p.loadImage("assets/img/game6/key1.png");
    phoneButtonImg_1_h = p.loadImage("assets/img/game6/key1-h.png");
    phoneButtonImg_2 = p.loadImage("assets/img/game6/key2.png");
    phoneButtonImg_2_h = p.loadImage("assets/img/game6/key2-h.png");
    phoneButtonImg_3 = p.loadImage("assets/img/game6/key3.png");
    phoneButtonImg_3_h = p.loadImage("assets/img/game6/key3-h.png");
    phoneButtonImg_4 = p.loadImage("assets/img/game6/key4.png");
    phoneButtonImg_4_h = p.loadImage("assets/img/game6/key4-h.png");
    phoneButtonImg_5 = p.loadImage("assets/img/game6/key5.png");
    phoneButtonImg_5_h = p.loadImage("assets/img/game6/key5-h.png");
    phoneButtonImg_6 = p.loadImage("assets/img/game6/key6.png");
    phoneButtonImg_6_h = p.loadImage("assets/img/game6/key6-h.png");
    phoneButtonImg_7 = p.loadImage("assets/img/game6/key7.png");
    phoneButtonImg_7_h = p.loadImage("assets/img/game6/key7-h.png");
    phoneButtonImg_8 = p.loadImage("assets/img/game6/key8.png");
    phoneButtonImg_8_h = p.loadImage("assets/img/game6/key8-h.png");
    phoneButtonImg_9 = p.loadImage("assets/img/game6/key9.png");
    phoneButtonImg_9_h = p.loadImage("assets/img/game6/key9-h.png");
    phoneButtonImg_0 = p.loadImage("assets/img/game6/key0.png");
    phoneButtonImg_0_h = p.loadImage("assets/img/game6/key0-h.png");
    phoneButtonImg_asterisk = p.loadImage("assets/img/game6/key_asterisk.png");
    phoneButtonImg_asterisk_h = p.loadImage(
      "assets/img/game6/key_asterisk-h.png"
    );
    phoneButtonImg_pound = p.loadImage("assets/img/game6/key_pound.png");
    phoneButtonImg_pound_h = p.loadImage("assets/img/game6/key_pound-h.png");

    screen_write = p.loadImage("assets/img/game6/screen_write.png");
    screen_write_error = p.loadImage("assets/img/game6/screen_write_error.png");
    screen_read = p.loadImage("assets/img/game6/screen_read.png");
    screen_symbols = p.loadImage("assets/img/game6/screen_symbols.png");
    screen_new = p.loadImage("assets/img/game6/screen_new.png");
    screen_sent = p.loadImage("assets/img/game6/screen_sent.png");
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game6canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game6canvas.classList.add("gameCanvas");
    game6canvas.classList.add("game6");
    game6canvas.id = "game6";
    thisCanvas = game6canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game N Sprites
    phoneButtons = [
      new Button(phoneButtonImg_1, phoneButtonImg_1_h, 234, 299, 1),
      new Button(phoneButtonImg_2, phoneButtonImg_2_h, 297, 299, 2),
      new Button(phoneButtonImg_3, phoneButtonImg_3_h, 360, 299, 3),
      new Button(phoneButtonImg_4, phoneButtonImg_4_h, 236, 346, 4),
      new Button(phoneButtonImg_5, phoneButtonImg_5_h, 300, 344, 5),
      new Button(phoneButtonImg_6, phoneButtonImg_6_h, 360, 343, 6),
      new Button(phoneButtonImg_7, phoneButtonImg_7_h, 236, 383, 7),
      new Button(phoneButtonImg_8, phoneButtonImg_8_h, 299, 382, 8),
      new Button(phoneButtonImg_9, phoneButtonImg_9_h, 361, 380, 9),
      new Button(
        phoneButtonImg_asterisk,
        phoneButtonImg_asterisk_h,
        236,
        421,
        "*"
      ),
      new Button(phoneButtonImg_0, phoneButtonImg_0_h, 298, 420, 0),
      new Button(phoneButtonImg_pound, phoneButtonImg_pound_h, 360, 421, "#"),
    ];
    phoneButtons.forEach(function (sprite, index) {
      sprite.sound = cellphoneSounds[index];
      sprite.addClickEvent(function () {
        //case where open/close symbols
        let correctButton = correctSequence[sequenceIndex];
        sprite.sound.start();
        if (sprite.keyNum == "*") {
          symbolsOpen = !symbolsOpen;
          // check if the button's code is the correct one... or it's the correct one +  -s in the case of the panel open
        } else if (
          (!symbolsOpen && sprite.keyNum == correctButton) ||
          (symbolsOpen && sprite.keyNum + "-s" == correctButton)
        ) {
          //At end of sequence. Need to get the next convo within this part
          if (sequenceIndex + 1 >= correctSequence.length) {
            let seasonChanging = false;
            // We're at the last convo in this part
            if (currentConvoIndex + 1 >= convoInfo[currentPart].length) {
              if (currentPart + 1 >= convoInfo.length) {
                //Actually just continue to make the screen darker
                numTimesFinished++;
              } else {
                seasonChanging = true;
                currentPart++;
                currentConvoIndex = 0;
              }
            } else {
              currentConvoIndex++;
            }
            sequenceIndex++;
            animateScreen(
              screenSprite,
              convoInfo[currentPart][currentConvoIndex].in,
              convoInfo[currentPart][currentConvoIndex].out,
              true,
              seasonChanging,
              function () {
                calculateCorrectSequence();
                sequenceIndex = 0;
              }
            );
          } else {
            //get the next letter in the sequence
            sequenceIndex++;
          }
          symbolsOpen = false;
        } else {
          animateError(screenSprite);
          symbolsOpen = false;
        }

        // sprite.keyNum;
      });
    });

    currentPhrase = convoInfo[currentPart][currentConvoIndex].out;
    outTextShown = currentPhrase;
    // convert to number
    calculateCorrectSequence();

    //Create screen
    screenSprite = new Button(screen_new, screen_new, 232, 4);
    screenSprite.interactive = false;

    //initialize backgound
    g6_bg = g6_bgs[0];
    document.dispatchEvent(canvasSetupEvent);
  };

  calculateCorrectSequence = function () {
    currentPhrase = convoInfo[currentPart][currentConvoIndex].out;
    correctSequence = [];
    for (let character of currentPhrase) {
      let num = letterToNumber[character.toLowerCase()];
      correctSequence.push(num);
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

  // Game 6

  function change_season() {
    g6_bg = g6_bgs[currentPart];
    if (currentPart == 1) {
      g6_songs[0].stop();
      whooshSound.start();
      setTimeout(function () {
        g6_songs[1].start();
      }, 1000);
    } else if (currentPart == 2) {
      g6_songs[1].stop();
      whooshSound.start();
      setTimeout(function () {
        g6_songs[2].start();
      }, 1000);
    }
  }

  function displayGame() {
    if (gameEntered && !gameStarted) {
      playGameVoiceover(game6_voiceover, 11, function () {
        animateScreen(
          screenSprite,
          convoInfo[currentPart][currentConvoIndex].in,
          convoInfo[currentPart][currentConvoIndex].out,
          false,
          false
        );
      });

      if (!gameVoiceoverOn) {
        animateScreen(
          screenSprite,
          convoInfo[currentPart][currentConvoIndex].in,
          convoInfo[currentPart][currentConvoIndex].out,
          false,
          false
        );
      }

      // start initial animation: in production we trigger this when voiceover ends

      gameStarted = true;
    }
    //Make sure to change this AFTER the thing stopped animating
    p.image(g6_bg, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    phoneButtons.forEach(function (button) {
      button.display();
    });

    screenSprite.display();

    p.textWrap(p.CHAR);
    p.textSize(20 * scaleRatio);
    p.fill("black");
    if (displayInText) {
      p.text(
        convoInfo[currentPart][currentConvoIndex].in,
        (247 + 5) * scaleRatio,
        (72 + 5) * scaleRatio,
        140 * scaleRatio,
        51 * scaleRatio
      );
    }
    if (displayOutText) {
      p.fill(p.color("rgba(0, 0, 0, .3)"));
      p.text(
        outTextShown,
        (247 + 5) * scaleRatio,
        (72 + 5) * scaleRatio,
        140 * scaleRatio,
        51 * scaleRatio
      );
      p.fill("black");
      p.text(
        outTextShown.slice(0, sequenceIndex),
        (247 + 5) * scaleRatio,
        (72 + 5) * scaleRatio,
        140 * scaleRatio,
        51 * scaleRatio
      );
    }
    if (symbolsOpen) {
      drawImageToScale(screen_symbols, 232, 4);
    }

    p.fill(p.color(`rgba(0, 0, 0, ${0.33 * numTimesFinished})`));
    p.rect(0, 0, canvasWidth, canvasHeight);

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
    constructor(buttonDefaultImg, buttonHover, xPos, yPos, keyNum) {
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
      this.keyNum = keyNum;
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
      if (this.keyNum) {
        let margin = 5;
        this.mouseInBounds =
          this.interactive &&
          !currentlyAnimating &&
          mouse_x > (this.x + margin) * scaleRatio &&
          mouse_x < (this.x + this.width - margin) * scaleRatio &&
          mouse_y > (this.y + margin) * scaleRatio &&
          mouse_y < (this.y + this.height - margin) * scaleRatio;
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
    gameEntered = false;
    gameStarted = false;
    currentPart = 0;
    currentConvoIndex = 0;
    currentPhrase = "";
    correctSequence = [];
    attemptedSequence = [];
    sequenceIndex = 0;
    displayInText = false;
    displayOutText = false;
    symbolsOpen = false;
    outTextShown = "";
    numTimesFinished = 0;
    currentPhrase = convoInfo[currentPart][currentConvoIndex].out;
    outTextShown = currentPhrase;
    screenSprite.buttonDefault = screen_new;
    g6_songs.forEach(function (song) {
      song.stop();
    });
    calculateCorrectSequence();
  }

  p.windowResized = function () {
    calculateCanvasDimensions();
    p.resizeCanvas(canvasWidth, canvasHeight);
  };

  // Special animation for doing text
  function animateScreen(
    sprite,
    incomingText,
    outgoingText,
    showSentScreen,
    seasonChanging,
    callback
  ) {
    currentlyAnimating = true;
    let interval = 1000;

    //show in order: sent, new message, read, write
    if (showSentScreen) {
      setTimeout(function () {
        displayOutText = false;
        sprite.buttonDefault = screen_sent;
        outTextShown = outgoingText;
      }, 1000);
    }
    setTimeout(function () {
      if (seasonChanging) {
        change_season();
      }
      sprite.buttonDefault = screen_new;
    }, interval * 1);
    setTimeout(function () {
      displayInText = true;
      sprite.buttonDefault = screen_read;
    }, interval * 2);
    setTimeout(function () {
      displayInText = false;
      displayOutText = true;
      sprite.buttonDefault = screen_write;
      currentlyAnimating = false;
      if (callback) {
        callback();
      }
    }, interval * 4);
  }

  function animateError(sprite) {
    currentlyAnimating = true;
    sprite.buttonDefault = screen_write_error;
    setTimeout(function () {
      sprite.buttonDefault = screen_write;
      currentlyAnimating = false;
    }, 300);
  }

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
    let musicDelay = 1000;
    if (gameVoiceoverOn) {
      currentlyAnimating = true;
      setTimeout(function () {
        g6_songs[0].start();
        setTimeout(function () {
          sound.start();
        }, musicDelay);
      }, voiceoverDelay * 1000);

      setTimeout(function () {
        currentlyAnimating = false;
        if (callback) {
          callback();
        }
      }, (time + voiceoverDelay) * 1000 + musicDelay);
    }
  }
};

new p5(game6, "canvas-game6");
