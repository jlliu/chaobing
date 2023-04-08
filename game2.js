// Game 2: Kumon

let game2canvas;

var game2 = function (p) {
  let thisSceneNum = 2;
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

  let currentQuestionNum = 0;

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
  let answerKey = ["a", "c", "d", "a"];

  let correctionAnswerKey = [];

  let gameDone = false;

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

    g2_paper = p.loadImage("assets/img/game2/paper.png");
    g2_paper_corrections = p.loadImage(
      "assets/img/game2/paper_corrections.png"
    );

    g2_doneSticker = p.loadImage("assets/img/game2/done_sticker.png");

    //Can we preload this and put into an array? We just wouldn't have a name
    // How would we store the correct one programmatically???? That's the confusing part.
    for (let i = 0; i < 4; i++) {
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

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    calculateCanvasDimensions(p);
    game2canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game2canvas.classList.add("gameCanvas");
    game2canvas.id = "game2";
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game 2 Sprites
    g2_paperToDraw = g2_paper;
    currentQuestionImg = questions[currentQuestionNum].question;
    let answers_images = questions[currentQuestionNum].answers;
    ans_a_sprite = new Button(answers_images[0], answers_images[0], 170, 220);
    ans_a_sprite.answer = "a";
    ans_b_sprite = new Button(answers_images[1], answers_images[1], 330, 220);
    ans_b_sprite.answer = "b";
    ans_c_sprite = new Button(answers_images[2], answers_images[2], 170, 300);
    ans_c_sprite.answer = "c";
    ans_d_sprite = new Button(answers_images[3], answers_images[3], 330, 300);
    ans_d_sprite.answer = "d";
    let answer_sprites = [
      ans_a_sprite,
      ans_b_sprite,
      ans_c_sprite,
      ans_d_sprite,
    ];
    answer_sprites.forEach(function (sprite) {
      let _this = sprite;
      sprite.addClickEvent(function () {
        if (!gameDone) {
          if (mode == "questions") {
            if (sprite.answer !== answerKey[currentQuestionNum]) {
              corrections.push(questions[currentQuestionNum]);
              correctionAnswerKey.push(answerKey[currentQuestionNum]);
            } else {
            }
            if (currentQuestionNum < questions.length - 1) {
              currentQuestionNum++;
              changeQuestion(questions);
            } else if (currentQuestionNum == questions.length - 1) {
              if (corrections.length) {
                currentQuestionNum = 0;
                mode = "corrections";
                changeQuestion(corrections);
                g2_paperToDraw = g2_paper_corrections;
              } else {
                console.log("game done!");
                gameDone = true;
                gameFinished();
              }
            }
          } else if (mode == "corrections") {
            if (sprite.answer == correctionAnswerKey[currentQuestionNum]) {
              corrections.splice(currentQuestionNum, 1);
              correctionAnswerKey.splice(currentQuestionNum, 1);
              if (corrections.length == 0) {
                console.log("game done!");
                gameDone = true;
                gameFinished();
              } else {
                currentQuestionNum = currentQuestionNum % corrections.length;
                changeQuestion(corrections);
              }
            } else {
              currentQuestionNum =
                (currentQuestionNum + 1) % corrections.length;
              changeQuestion(corrections);
            }
          }
        }
      });
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
    p.image(g2_bg, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    drawImageToScale(g2_paperToDraw, 157, 29);
    //We should be displaying questions, and then the buttons

    //Draw current question
    // let currentQuestionImg = questions[currentQuestionNum].question;
    drawImageToScale(currentQuestionImg, 170, 100);

    ans_a_sprite.display();
    ans_b_sprite.display();
    ans_c_sprite.display();
    ans_d_sprite.display();

    //Display finished state
    if (gameDone) {
      drawImageToScale(g2_doneSticker, 270, 200);
    }

    // Navigation
    rightButton.display();
    leftButton.display();
  }

  function changeQuestion(questionObj) {
    // console.log(questionObj);
    // console.log(currentQuestionNum);
    // console.log(questionObj[currentQuestionNum]);
    currentQuestionImg = questionObj[currentQuestionNum].question;
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

  function gameFinished() {
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
      game2canvas.addEventListener("mousedown", function (e) {
        if (_this.isMouseInBounds()) {
          _this.intendingToClick = true;
          clickedObjects.push(_this);
        }
      });
    }

    addClickEvent(clickFunction) {
      let _this = this;
      game2canvas.addEventListener("click", function (e) {
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
      game2canvas.addEventListener("mousedown", function (e) {
        if (_this.mouseInBounds) {
          _this.dragging = true;
          currentlyDragging = true;
          clickedObjects.forEach(function (value) {
            value.intendingToClick = false;
            clickedObjects = [];
          });
        }
      });

      game2canvas.addEventListener("mouseup", function (e) {
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
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        harpTransitionOutSound.play();
        // We need to hide this.
        storyCanvas.style.visibility = "visible";
        storyCanvas.style.opacity = 1;
        window.setTimeout(function () {
          game1canvas.style.visibility = "hidden";
          storyMode = true;
          p.noLoop();
        }, 1000);
        storyMode = true;
      }
    });
    leftButton.addClickEvent(function (e) {
      if (currentlyAnimating == false) {
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }
        harpTransitionOutSound.play();
        // We need to hide this.
        storyCanvas.style.visibility = "visible";
        storyCanvas.style.opacity = 1;
        window.setTimeout(function () {
          game1canvas.style.visibility = "hidden";
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

  // Animates a sprite given the images as frames, based on a certain interval, with optional callback
  function intervalAnimation(sprite, frames, interval, callback) {
    currentlyAnimating = true;
    frames.forEach(function (img, index) {
      setTimeout(function () {
        timedAnimationIndex = (index + 1) % frames.length;
        sprite.buttonDefault = img;
        if (timedAnimationIndex == 0) {
          currentlyAnimating = false;
          if (callback) {
            callback();
          }
        }
      }, interval * index);
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

new p5(game2, "canvas3");
