// Game N: Template for any game number

let game7canvas;

var game7 = function (p) {
  let thisCanvas;
  let thisSceneNum = 7;
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

  let currentPromptIndex = 0;
  let clickNum = 0;

  let startTicks = false;
  let ticks = 0;
  let displayActualGame = false;
  // let currentString = "";

  let prompts = [
    {
      question: "Share your story.",
      answer:
        "My name is Jackie. I grew up in the wooded suburbs of New Jersey. I like art, music, and math and science. I cry a lot. I don't know what else there is to say.",
    },
    {
      question: "What field of study appeals to you, and why?",
      answer:
        "I guess I'm going to study computer science. I like the idea of making expressive stuff between art and technology. I don't realize that going to engineering school will actually extinguish my inner creative voice and my will to live. Anyway, I like Computer Science because it combines STEM with creativity!",
    },
    {
      question:
        "  Tell us about the time you faced adversity, and how you overcame it.",
      answer:
        "I don't know. Am I allowed to say anything is actually hard? I have everything I needed. Education, a house, food on the table, the ability to have extracurriculars like piano. Sometimes I just feel so fucking lonely. It's fine. I feel so fucking exhausted. It's ok. i kind of want to die. it's ok!!",
    },
    {
      question: "What makes you worthy of being alive?.",
      answer:
        "I don't know I don't know i don't know I don't know I don't know I don't know I don't know I don't know I don't know I don't know I don't know I don't know I don't know",
    },
    {
      question: "Is your life empty and meaningless?",
      answer:
        "aoidfjaoisdjas odfjsdoifj aojfdoisajfaiwrjg ;rjoijs;doji;asj dfaoijsdof iajsdfoj as;oifj soadifj osfj osijfio sdjfoa isdjfosa;djf asdjfo asdjf ;odsijfo ;sadijf daosijfisIOSJDF:Ajdfoj:FOJsdjf oisJDFojd sfosijf ds",
    },
  ];

  let keyImages = [];

  p.preload = function () {
    //Preload a background here
    g7_bg = p.loadImage("assets/img/game7/bg.png");
    g7_bg_upper = p.loadImage("assets/img/game7/bg-upper.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded
    keyboard = p.loadImage("assets/img/game7/keyboard.png");
    keyboard_h = p.loadImage("assets/img/game7/keyboard-h.png");

    keysSpritesheet = p.loadImage("assets/img/game7/keys-spritesheet.png");

    keys = p.loadImage(`assets/img/game7/keys.png`);
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game7canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game7canvas.classList.add("gameCanvas");
    game7canvas.classList.add("game7");
    game7canvas.id = "game7";
    thisCanvas = game7canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game N Sprites
    for (let i = 0; i < 8; i++) {
      let width = 322;
      let height = 124;
      let img = keysSpritesheet.get(0, height * i, width, height);
      keyImages.push(img);
    }
    prompts.forEach(function (prompt) {
      let wordsSeparated = prompt.answer.split(" ");
      prompt.wordsSeparated = wordsSeparated;
      prompt.currentString = "";
    });
    keyboardSprite = new Button(keyboard, keyboard_h, 153, 349);
    keyboardSprite.addClickEvent(function () {
      let randomSound =
        keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)];
      randomSound.start();
      startTicks = true;
      let currentPrompt = prompts[currentPromptIndex];
      // let increment = Math.floor(Math.random() * 3);
      clickNum++;
      // add a new character onto the string so far
      currentPrompt.currentString =
        currentPrompt.currentString +
        " " +
        currentPrompt.wordsSeparated[clickNum - 1];
      // do a little animation of keys
      keysSprite.buttonDefault =
        keyImages[Math.floor(Math.random() * keyImages.length)];
      setTimeout(function () {
        keysSprite.buttonDefault = keys;
      }, 200);
      //detect when we get to the end of the prompt
      if (
        clickNum == prompts[currentPromptIndex].wordsSeparated.length &&
        currentPromptIndex != prompts.length - 1
      ) {
        currentPromptIndex++;
        clickNum = 0;
      }
    });
    keysSprite = new Button(keys, keys, 153, 349);
    keysSprite.interactive = false;
    document.dispatchEvent(canvasSetupEvent);
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
    //Do things we need to do when entered minigame
    let displacement = 0;
    if (gameEntered && !gameStarted) {
      p.clear();
      gameStarted = true;
      if (gameVoiceoverOn) {
        playGameVoiceover(game7_voiceover, 17, function () {
          // startTicks = true;
          game7_soundtrack.start();
        });
        setTimeout(function () {
          displayActualGame = true;
        }, 10900);
      } else {
        displayActualGame = true;
        // startTicks = true;
      }
    }
    if (startTicks) {
      ticks++;
      displacement = Math.floor(ticks / 3);
    }
    if (displayActualGame) {
      p.image(g7_bg, 0, 0, canvasWidth, canvasHeight);

      //display the prompts and ongoing responses
      p.textWrap(p.WORD);

      p.fill("black");

      //Prompt one
      p.textSize(16 * scaleRatio);
      p.text(
        prompts[0].question,
        186 * scaleRatio,
        (110 - displacement) * scaleRatio,
        270 * scaleRatio
      );

      p.textSize(14 * scaleRatio);
      p.text(
        prompts[0].currentString,
        186 * scaleRatio,
        (150 - displacement) * scaleRatio,
        270 * scaleRatio
      );
      //Prompt 2

      p.textSize(16 * scaleRatio);
      p.text(
        prompts[1].question,
        186 * scaleRatio,
        (250 - displacement) * scaleRatio,
        270 * scaleRatio
      );

      p.textSize(14 * scaleRatio);
      p.text(
        prompts[1].currentString,
        186 * scaleRatio,
        (300 - displacement) * scaleRatio,
        270 * scaleRatio
      );
      //Prompt 3
      p.textSize(16 * scaleRatio);
      p.text(
        prompts[2].question,
        186 * scaleRatio,
        (490 - displacement) * scaleRatio,
        270 * scaleRatio
      );

      p.textSize(14 * scaleRatio);
      p.text(
        prompts[2].currentString,
        186 * scaleRatio,
        (550 - displacement) * scaleRatio,
        270 * scaleRatio
      );
      //Prompt 4
      p.textSize(16 * scaleRatio);
      p.text(
        prompts[3].question,
        186 * scaleRatio,
        (710 - displacement) * scaleRatio,
        270 * scaleRatio
      );

      p.textSize(14 * scaleRatio);
      p.text(
        prompts[3].currentString,
        186 * scaleRatio,
        (760 - displacement) * scaleRatio,
        270 * scaleRatio
      );
      // Prompt 5
      p.textSize(16 * scaleRatio);
      p.text(
        prompts[4].question,
        186 * scaleRatio,
        (860 - displacement) * scaleRatio,
        270 * scaleRatio
      );

      p.textSize(14 * scaleRatio);
      p.text(
        prompts[4].currentString,
        186 * scaleRatio,
        (900 - displacement) * scaleRatio,
        270 * scaleRatio
      );

      p.image(g7_bg_upper, 0, 0, canvasWidth, canvasHeight);
      // Display Sprites
      keyboardSprite.display();
      keysSprite.display();
    }

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
        // setInterval(function () {
        harpTransitionOutSound.start();
        // }, 30);

        // harpTransitionOutSound.start();
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
    ticks = 0;
    startTicks = false;
    displacement = 0;
    displayActualGame = false;
    prompts.forEach(function (prompt) {
      prompt.currentString = "";
    });
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
};

new p5(game7, "canvas-game7");
