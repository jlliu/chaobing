// Game N: Template for any game number

let game3canvas;

var game3 = function (p) {
  let thisCanvas;
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

  let sequence = [];

  let sequenceSprites = [];

  let actions = {
    stir: {},
    low: {},
    medium: {},
    high: {},
    soySauce: {},
    ruminate: {},
    rest: {},
    sob: {},
    high2: {},
    chiliOil: {},
  };

  let startingX = 550;
  let intervalX = 360;

  let linePosition = 56;

  let knobPositions = {
    low: 469,
    medium: 511,
    high: 550,
  };

  let activeAction = null;

  let actionDone = null;

  let activeActionButton = null;

  let speed = 1;

  let chaobingAnimationImgs = [];

  p.preload = function () {
    //Preload a background here
    bg_transform = p.loadImage("assets/img/ending/bg-transform.png");

    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload whatever needs to be preloaded
    for (const action in actions) {
      let actionObj = actions[action];
      actionObj.img = p.loadImage(`assets/img/ending/action-${action}.png`);
      actionObj.img_h = p.loadImage(`assets/img/ending/action-${action}-h.png`);
    }

    knob = p.loadImage(`assets/img/ending/knob.png`);
    knob_h = p.loadImage(`assets/img/ending/knob-h.png`);
    line = p.loadImage(`assets/img/ending/line.png`);
    incorrect = p.loadImage(`assets/img/ending/incorrect.png`);
    correct = p.loadImage(`assets/img/ending/correct.png`);

    actions["soySauce"].actionButtonImg = p.loadImage(
      `assets/img/ending/actionbutton-soySauce.png`
    );
    actions["soySauce"].actionButtonImg_h = p.loadImage(
      `assets/img/ending/actionbutton-soySauce-h.png`
    );
    actions["soySauce"].actionButtonPos = { x: 30, y: 30 };

    actions["sob"].actionButtonImg = p.loadImage(
      `assets/img/ending/actionbutton-sob.png`
    );
    actions["sob"].actionButtonImg_h = p.loadImage(
      `assets/img/ending/actionbutton-sob-h.png`
    );
    actions["sob"].actionButtonPos = { x: 30, y: 30 };

    actions["ruminate"].actionButtonImg = p.loadImage(
      `assets/img/ending/actionbutton-ruminate.png`
    );
    actions["ruminate"].actionButtonImg_h = p.loadImage(
      `assets/img/ending/actionbutton-ruminate-h.png`
    );
    actions["ruminate"].actionButtonPos = { x: 30, y: 30 };

    actions["chiliOil"].actionButtonImg = p.loadImage(
      `assets/img/ending/actionbutton-chiliOil.png`
    );
    actions["chiliOil"].actionButtonImg_h = p.loadImage(
      `assets/img/ending/actionbutton-chiliOil-h.png`
    );
    actions["chiliOil"].actionButtonPos = { x: 30, y: 30 };

    actions["stir"].actionButtonImg = p.loadImage(
      `assets/img/ending/actionbutton-stir.png`
    );
    actions["stir"].actionButtonImg_h = p.loadImage(
      `assets/img/ending/actionbutton-stir-h.png`
    );
    actions["stir"].actionButtonPos = { x: 349, y: 38 };

    actions["high2"].actionButtonImg = p.loadImage(
      `assets/img/ending/actionbutton-high2.png`
    );
    actions["high2"].actionButtonImg_h = p.loadImage(
      `assets/img/ending/actionbutton-high2-h.png`
    );
    actions["high2"].actionButtonPos = { x: 30, y: 30 };

    for (let i = 0; i < 4; i++) {
      chaobingAnimationImgs.push(
        p.loadImage(`assets/img/ending/chaobing-animation${i}.png`)
      );
    }
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    // calculateCanvasDimensions(p);
    game3canvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    game3canvas.classList.add("gameCanvas");
    game3canvas.classList.add("game3");
    game3canvas.id = "game3";
    thisCanvas = game3canvas;
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    //Initialize Game N Sprites

    var integrateForm = document.getElementById("transformForm");

    let options = integrateForm.querySelectorAll("select");
    options.forEach(function (option, index) {
      sequence.push(option.value);
    });

    integrateForm.addEventListener("input", function (e) {
      sequence = [];
      options.forEach(function (option, index) {
        sequence.push(option.value);
      });
      generateSprites();
    });

    // Generate sprites for the original sequence
    generateSprites();

    knobSprite = new Draggable(
      knob,
      knob_h,
      knobPositions["low"],
      300,
      null,
      null
    );

    chaobingAnimationSprite = new Button(
      chaobingAnimationImgs[0],
      chaobingAnimationImgs[0],
      210,
      38
    );
    chaobingAnimationSprite.interactive = false;
  };

  function generateSprites() {
    sequenceSprites = [];
    sequence.forEach(function (action, index) {
      let sprite = new Button(
        actions[action].img,
        actions[action].img,
        startingX + intervalX * index,
        418
      );
      sprite.action = action;
      sprite.passed = false;
      sprite.interactive = false;
      sequenceSprites.push(sprite);

      //Add the action button for it if relevant
      if (actions[action].actionButtonImg) {
        let actionButtonSprite = new Button(
          actions[action].actionButtonImg,
          actions[action].actionButtonImg_h,
          actions[action].actionButtonPos.x,
          actions[action].actionButtonPos.y
        );
        actionButtonSprite.addClickEvent(function () {
          actionDone = true;
          if (action == "stir") {
            actionButtonSprite.visible = false;
            intervalAnimation(
              chaobingAnimationSprite,
              chaobingAnimationImgs,
              300,
              function () {
                actionButtonSprite.visible = true;
              }
            );
          }
        });
        actionButtonSprite.interactive = false;
        actions[action].actionButtonSprite = actionButtonSprite;
      }
    });
  }

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
    p.image(bg_transform, 0, 0, canvasWidth, canvasHeight);

    // Display Sprites
    chaobingAnimationSprite.display();
    sequenceSprites.forEach(function (sprite, index) {
      sprite.x = sprite.x - speed;
      sprite.display();

      if (!sprite.passed) {
        //Detect if action is current
        if (sprite.x < linePosition) {
          if (activeAction !== sprite.action) {
            sprite.buttonDefault = actions[sprite.action].img_h;
            activeAction = sprite.action;
            actionDone = null;
            // Deterine which action button should appear
            if (actions[sprite.action].actionButtonSprite) {
              actions[sprite.action].actionButtonSprite.interactive = true;
              activeActionButton = actions[sprite.action].actionButtonSprite;
              // activeActionButton.interactive = true;
            }
          }
        }
        //Detect if action is passed
        if (sprite.x < linePosition - sprite.width) {
          // activeActionButton.interactive = false;
          if (actions[sprite.action].actionButtonSprite) {
            actions[sprite.action].actionButtonSprite.interactive = false;
          }
          sprite.buttonDefault = actions[sprite.action].img;
          sprite.passed = true;

          if (actionDone == null && activeAction == "rest") {
            actionDone = true;
          } else if (actionDone == null) {
            actionDone = false;
          }
          activeActionButton = null;
          activeAction = null;
        }
      }
      //Detect if last action is passed, then reset
      if (
        index == sequenceSprites.length - 1 &&
        sprite.x < linePosition - sprite.width * 3
      ) {
        actionDone = null;
        activeAction = null;
        generateSprites();
      }
    });

    drawImageToScale(line, 32, 356);
    knobSprite.display();

    //Display the button that is active...
    if (activeActionButton) {
      activeActionButton.display();
    }
    if (actionDone == true) {
      drawImageToScale(correct, 45, 268);
    } else if (actionDone == false) {
      drawImageToScale(incorrect, 45, 268);
    }

    // Still todo... make simple animations when we click actions
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
      this.temperature = "low";
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
        _this.dragging = false;
        currentlyDragging = false;
        // If dropped in the target area, then it's done
        // if (_this.mouseInBounds) {
        //   _this.dragging = false;
        //   currentlyDragging = false;
        //   if (
        //     mouse_x > xRange[0] * scaleRatio &&
        //     mouse_x < xRange[1] * scaleRatio &&
        //     mouse_y > yRange[0] * scaleRatio &&
        //     mouse_y < yRange[1] * scaleRatio
        //   ) {
        //     _this.interactive = false;
        //     pageFlipSound.start();
        //     //Snap it into position if we don't make it disappear
        //     if (_this.xFinal && _this.yFinal) {
        //       _this.xCurrent = _this.xFinal;
        //       _this.yCurrent = _this.yFinal;
        //     } else {
        //       _this.visible = false;
        //     }
        //   } else {
        //     _this.xCurrent = _this.x;
        //     _this.yCurrent = _this.y;
        //   }
        // }
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
        let xPosition = Math.floor((mouse_x - this.width / 2) / scaleRatio);
        if (xPosition < 484) {
          this.xCurrent = knobPositions["low"];
          this.temperature = "low";
        } else if (xPosition < 546) {
          this.xCurrent = knobPositions["medium"];
          this.temperature = "medium";
        } else {
          this.xCurrent = knobPositions["high"];
          this.temperature = "high";
        }
        // this.yCurrent = Math.floor((mouse_y - this.height / 2) / scaleRatio);
      }
      // Check if we're currently in this action
      if (
        activeAction == "low" ||
        activeAction == "medium" ||
        activeAction == "high"
      ) {
        if (this.xCurrent == knobPositions["low"] && activeAction == "low") {
          actionDone = true;
        }
        if (
          this.xCurrent == knobPositions["medium"] &&
          activeAction == "medium"
        ) {
          actionDone = true;
        }
        if (this.xCurrent == knobPositions["high"] && activeAction == "high") {
          actionDone = true;
        }
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

new p5(game3, "canvas-game3");
