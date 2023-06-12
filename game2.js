// Game 2: Kumon

let game2canvas;

var game2 = function (p) {
  let thisCanvas;
  let thisSceneNum = 2;
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

  let correctQuestionsNum = 0;
  let totalQuestions = 12;
  let currentQuestionNum = 0;
  let correctionNoteNum = 0;

  let timerInitialized = false;
  let timerPaused = false;
  let timer;
  // length of timer, in ms
  let timeCount = 0;
  let timerDisplay = "00:00";

  let gameEntered = false;
  let gameStarted = false;

  //Establish a questions or a corrections mode
  let mode = "questions";

  // We're going to have a list of questions and answers
  // These will be image files! Make these the paths to the questions and answers
  // Then we will turn them into sprites for buttons, and whatnot
  let questions = [
    //{ question: "path", correct: "path", answers: ["path", "path", "path"] },
  ];

  let corrections = [];

  //Store correct answers as the letter codes
  let answerKey = ["a", "d", "c", "b", "a", "b", "d", "d", "d", "c", "c", "b"];

  let correctionAnswerKey = [];

  let gameDone = false;

  let appleAnimation = [];

  let pencilAnimation = [];

  let ojFrames = [];

  let eraseAnimation = [];

  let paperAnimation = [];

  let correctionNotes = [];

  let answer_sprites;

  let answer_bgs;

  // Then we will display them in order (could be random later, doesn't matter)
  // Wrong ones go to a pile at the end
  // If left with one you just have to keep trying again until it's done

  p.preload = function () {
    g2_bg = p.loadImage("assets/img/game2/bg.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    for (let i = 0; i < 3; i++) {
      paperAnimation.push(p.loadImage(`assets/img/game2/paper${i}.png`));
    }

    for (let i = 0; i < 5; i++) {
      correctionNotes.push(p.loadImage(`assets/img/game2/correction${i}.png`));
    }

    eraser = p.loadImage("assets/img/game2/eraser.png");

    for (let i = 0; i < 8; i++) {
      eraseAnimation.push(p.loadImage(`assets/img/game2/erase${i}.png`));
    }
    for (let i = 0; i < 4; i++) {
      appleAnimation.push(p.loadImage(`assets/img/game2/apple${i}.png`));
    }
    for (let i = 0; i < 16; i++) {
      pencilAnimation.push(p.loadImage(`assets/img/game2/pencil${i}.png`));
    }

    for (let i = 0; i < 4; i++) {
      ojFrames.push(p.loadImage(`assets/img/game2/oj${i}.png`));
    }
    sticky = p.loadImage("assets/img/game2/sticky.png");
    g2_doneSticker = p.loadImage("assets/img/game2/done_sticker.png");

    answer_bgs = {
      a: {
        default: p.loadImage(`assets/img/game2/buttonA.png`),
        hover: p.loadImage(`assets/img/game2/buttonA-h.png`),
        yes: p.loadImage(`assets/img/game2/buttonA-y.png`),
        no: p.loadImage(`assets/img/game2/buttonA-n.png`),
      },
      b: {
        default: p.loadImage(`assets/img/game2/buttonB.png`),
        hover: p.loadImage(`assets/img/game2/buttonB-h.png`),
        yes: p.loadImage(`assets/img/game2/buttonB-y.png`),
        no: p.loadImage(`assets/img/game2/buttonB-n.png`),
      },
      c: {
        default: p.loadImage(`assets/img/game2/buttonC.png`),
        hover: p.loadImage(`assets/img/game2/buttonC-h.png`),
        yes: p.loadImage(`assets/img/game2/buttonC-y.png`),
        no: p.loadImage(`assets/img/game2/buttonC-n.png`),
      },
      d: {
        default: p.loadImage(`assets/img/game2/buttonD.png`),
        hover: p.loadImage(`assets/img/game2/buttonD-h.png`),
        yes: p.loadImage(`assets/img/game2/buttonD-y.png`),
        no: p.loadImage(`assets/img/game2/buttonD-n.png`),
      },
    };

    for (let i = 0; i < totalQuestions; i++) {
      let questionToLoad = p.loadImage(`assets/img/game2/${i + 1}.png`);
      let ans_a = p.loadImage(`assets/img/game2/${i + 1}a.png`);
      let ans_b = p.loadImage(`assets/img/game2/${i + 1}b.png`);
      let ans_c = p.loadImage(`assets/img/game2/${i + 1}c.png`);
      let ans_d = p.loadImage(`assets/img/game2/${i + 1}d.png`);
      let questionObj = {
        question: questionToLoad,
        answers: [ans_a, ans_b, ans_c, ans_d],
      };
      questions.push(questionObj);
    }
  };

  let resetValues = function () {
    currentQuestionImg = questions[currentQuestionNum].question;
    questionSprite = new Button(
      currentQuestionImg,
      currentQuestionImg,
      170,
      100
    );
    questionSprite.interactive = false;

    let answers_images = questions[currentQuestionNum].answers;
    ans_a_sprite = new AnswerButton(answers_images[0], answer_bgs.a, 184, 231);
    ans_a_sprite.answer = "a";
    ans_b_sprite = new AnswerButton(answers_images[1], answer_bgs.b, 321, 225);
    ans_b_sprite.answer = "b";
    ans_c_sprite = new AnswerButton(answers_images[2], answer_bgs.c, 185, 316);
    ans_c_sprite.answer = "c";
    ans_d_sprite = new AnswerButton(answers_images[3], answer_bgs.d, 322, 313);
    ans_d_sprite.answer = "d";
    answer_sprites = [ans_a_sprite, ans_b_sprite, ans_c_sprite, ans_d_sprite];

    let progressQuestion = function () {
      if (currentQuestionNum < questions.length - 1) {
        currentQuestionNum++;
        changeQuestion(questions);
        flipAnimation();
      } else if (currentQuestionNum == questions.length - 1) {
        if (corrections.length) {
          currentQuestionNum = 0;
          mode = "corrections";
          changeQuestion(corrections);
          flipAnimation();
        } else {
          gameFinished();
        }
      }
    };

    let progressCorrectionCorrect = function () {
      if (corrections.length == 0) {
        gameFinished();
      } else {
        currentQuestionNum = currentQuestionNum % corrections.length;
        changeQuestion(corrections);
        flipAnimation();
      }
    };
    let progressCorrectionIncorrect = function () {
      currentQuestionNum = (currentQuestionNum + 1) % corrections.length;
      changeQuestion(corrections);
      flipAnimation();
    };

    let correctQuestion = function () {
      correctQuestionsNum++;
      ojSprite.buttonDefault = ojFrames[Math.floor(correctQuestionsNum / 4)];
      if (correctQuestionsNum % 4 == 0) {
        boingSound.start();
      }
    };
    answer_sprites.forEach(function (sprite) {
      let _this = sprite;
      sprite.addClickEvent(function () {
        if (!gameDone) {
          if (mode == "questions") {
            if (sprite.answer !== answerKey[currentQuestionNum]) {
              corrections.push(questions[currentQuestionNum]);
              correctionAnswerKey.push(answerKey[currentQuestionNum]);
              sprite.animate(false, progressQuestion);
            } else {
              correctQuestion();
              sprite.animate(true, progressQuestion);
            }
          } else if (mode == "corrections") {
            if (sprite.answer == correctionAnswerKey[currentQuestionNum]) {
              correctQuestion();
              sprite.animate(true, progressCorrectionCorrect);
              corrections.splice(currentQuestionNum, 1);
              correctionAnswerKey.splice(currentQuestionNum, 1);
            } else {
              sprite.animate(false, progressCorrectionIncorrect);
            }
          }
        }
      });
    });
  };
  p.setup = function () {
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    game2canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game2canvas.classList.add("gameCanvas");
    game2canvas.classList.add("game2");
    game2canvas.id = "game2";
    thisCanvas = game2canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game 2 Sprites
    paperAnimationSprite = new Button(
      paperAnimation[0],
      paperAnimation[0],
      83,
      0
    );
    paperAnimationSprite.interactive = false;
    correctionSprite = new Button(
      correctionNotes[0],
      correctionNotes[0],
      83,
      0
    );
    correctionSprite.interactive = false;
    correctionSprite.visible = false;
    eraserSprite = new Button(eraser, eraser, 40, 300);
    eraseAnimationSprite = new Button(
      eraseAnimation[0],
      eraseAnimation[0],
      0,
      0
    );
    eraseAnimationSprite.visible = false;
    eraserSprite.addClickEvent(function (e) {
      if (!currentlyAnimating) {
        eraseAnimationSprite.visible = true;
        intervalAnimation(
          eraseAnimationSprite,
          eraseAnimation,
          200,
          function () {
            eraseAnimationSprite.visible = false;
          }
        );
        boingSound.start();
      }
    });
    appleAnimationSprite = new Button(
      appleAnimation[0],
      appleAnimation[0],
      512,
      277
    );
    appleAnimationSprite.addClickEvent(function (e) {
      if (!currentlyAnimating) {
        intervalAnimation(appleAnimationSprite, appleAnimation, 500);
        boingSound.start();
      }
    });
    pencilAnimationSprite = new Button(
      pencilAnimation[0],
      pencilAnimation[0],
      474,
      0
    );
    pencilAnimationSprite.addClickEvent(function (e) {
      if (!currentlyAnimating) {
        intervalAnimation(pencilAnimationSprite, pencilAnimation, 190);
        runningSound.start();
      }
    });
    ojSprite = new Button(ojFrames[0], ojFrames[0], 0, 30);
    ojSprite.interactive = false;
    //Sprites related to questions

    resetValues();
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
      playGameVoiceover(game2_voiceover, 13, function () {
        initializeTimer();
      });
    }
    if (gameStarted) {
      // console.log(currentQuestionNum);
    }
    p.image(g2_bg, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites

    drawImageToScale(sticky, 39, 151);
    ojSprite.display();

    //Decide which OJ to draw

    eraserSprite.display();
    paperAnimationSprite.display();

    appleAnimationSprite.display();

    pencilAnimationSprite.display();
    pencilAnimationSprite.display();

    //We should be displaying questions, and then the buttons

    questionSprite.display();

    //timer
    p.textSize(p.width / 25);
    p.text(timerDisplay, p.width * 0.6, p.height * 0.15);

    ans_a_sprite.display();
    ans_b_sprite.display();
    ans_c_sprite.display();
    ans_d_sprite.display();

    correctionSprite.display();

    //Display finished state
    if (gameDone) {
      drawImageToScale(g2_doneSticker, 270, 200);
    }

    // Navigation
    rightButton.display();
    leftButton.display();
    restartButton.display();

    eraseAnimationSprite.display();
  }

  function changeQuestion(questionObj) {
    currentQuestionImg = questionObj[currentQuestionNum].question;
    questionSprite.buttonDefault = currentQuestionImg;
    questionSprite.buttonHover = currentQuestionImg;
    if (mode == "corrections") {
      if (correctionNoteNum !== 0) {
        correctionSprite.buttonDefault =
          correctionNotes[correctionNoteNum % correctionNotes.length];
      }
      correctionNoteNum++;
    }
    let answers_images = questionObj[currentQuestionNum].answers;
    ans_a_sprite.buttonDefault = answers_images[0];
    ans_a_sprite.buttonHover = answers_images[0];
    ans_b_sprite.buttonDefault = answers_images[1];
    ans_b_sprite.buttonHover = answers_images[1];
    ans_c_sprite.buttonDefault = answers_images[2];
    ans_c_sprite.buttonHover = answers_images[2];
    ans_d_sprite.buttonDefault = answers_images[3];
    ans_d_sprite.buttonHover = answers_images[3];
  }
  function flipAnimation() {
    questionSprite.visible = false;
    correctionSprite.visible = false;
    answer_sprites.forEach(function (sprite) {
      sprite.visible = false;
      sprite.interactive = false;
    });
    intervalAnimation(paperAnimationSprite, paperAnimation, 300, function () {
      answer_sprites.forEach(function (sprite) {
        sprite.visible = true;
        sprite.interactive = true;
        questionSprite.visible = true;
        if (mode == "corrections") {
          correctionSprite.visible = true;
        }
      });
    });
    pageFlipSound.start();
  }

  function gameFinished() {
    gameDone = true;
    stopTimer();
    ans_a_sprite.interactive = false;
    ans_b_sprite.interactive = false;
    ans_c_sprite.interactive = false;
    ans_d_sprite.interactive = false;
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

  class AnswerButton {
    constructor(questionImg, bgs, xPos, yPos) {
      this.x = xPos;
      this.y = yPos;
      this.buttonDefault = questionImg;
      this.bgDefault = bgs.default;
      this.bgHover = bgs.hover;
      this.bgYes = bgs.yes;
      this.bgNo = bgs.no;
      this.bgToDraw = bgs.default;
      this.width = questionImg.width;
      this.height = questionImg.height;
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
        if (
          _this.isMouseInBounds() &&
          _this.intendingToClick &&
          !currentlyAnimating
        ) {
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
    animate(correct, callback) {
      let _this = this;
      if (correct) {
        this.interactive = false;
        intervalAnimationAnswer(
          this,
          [this.bgYes, this.bgDefault, this.bgYes, this.bgDefault],
          300,
          function () {
            _this.interactive = true;
            _this.bgToDraw = _this.bgDefault;
            callback();
          }
        );
      } else {
        this.interactive = false;
        intervalAnimationAnswer(
          this,
          [this.bgNo, this.bgDefault, this.bgNo, this.bgDefault],
          300,
          function () {
            _this.interactive = true;
            _this.bgToDraw = _this.bgDefault;
            callback();
          }
        );
      }
    }
    display() {
      if (!currentlyAnimating) {
        this.bgToDraw =
          this.isMouseInBounds() && !currentlyDragging
            ? this.bgHover
            : this.bgDefault;
      }

      if (this.visible) {
        drawImageToScale(this.bgToDraw, this.x, this.y);
        drawImageToScale(this.buttonDefault, this.x, this.y);
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
  function initializeTimer() {
    if (!timerInitialized && !gameDone) {
      timer = setInterval(function () {
        if (!timerPaused) {
          timeCount += 1;
          let seconds = Math.floor(timeCount) % 60;
          let minutes = Math.floor(timeCount / 60) % 60;
          let sec_display, min_display;
          if (seconds < 10) {
            sec_display = `0${seconds}`;
          } else {
            sec_display = `${seconds}`;
          }
          if (minutes < 10) {
            min_display = `0${minutes}`;
          } else {
            min_display = `${minutes}`;
          }
          timerDisplay = `${min_display}:${sec_display}`;
        }
      }, 1000);
      timerInitialized = true;
      timerPaused = false;
    }
  }
  function stopTimer() {
    clearInterval(timer);
    timerInitialized = false;
  }
  function setupNavigation() {
    p.noLoop();
    document.addEventListener("navigateFwd", (e) => {
      if (currentSceneNum == thisSceneNum) {
        p.loop();
        gameEntered = true;
      }
    });
    document.addEventListener("navigateBack", (e) => {
      if (currentSceneNum == thisSceneNum + 1) {
        p.loop();
        gameEntered = true;
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
          hideCanvas();
          p.noLoop();
          stopTimer();
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
          hideCanvas();
          p.noLoop();
          stopTimer();
        }, 1000);
        storyMode = true;
      }
    });
  }

  function hideCanvas() {
    //Add things we want to do when we leave this scene
    gameEntered = false;
    gameStarted = false;
    timerInitialized = false;
    timerPaused = false;
    timeCount = 0;
    timerDisplay = "00:00";
    mode = "questions";
    correctQuestionsNum = 0;
    currentQuestionNum = 0;
    correctionNoteNum = 0;
    gameDone = false;
    ans_a_sprite.interactive = true;
    ans_b_sprite.interactive = true;
    ans_c_sprite.interactive = true;
    ans_d_sprite.interactive = true;
    resetValues();
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

  // Animates a sprite given the images as frames, based on a certain interval, with optional callback
  function intervalAnimationAnswer(sprite, frames, interval, callback) {
    currentlyAnimating = true;
    frames.forEach(function (img, index) {
      setTimeout(function () {
        timedAnimationIndex = (index + 1) % frames.length;
        sprite.bgToDraw = img;
      }, interval * index);
    });
    // Another for the last frame
    setTimeout(function () {
      currentlyAnimating = false;
      sprite.bgToDraw = frames[0];
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

new p5(game2, "canvas-game2");
