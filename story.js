// save this file as sketch.js
// Sketch One

let canvas1;
let scaleRatio = 1;
let canvasWidth = 640;
let canvasHeight = 480;
let currentlyAnimating = false;
let currentSceneNum = 1;

var sketch1 = function (p) {
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let cursorState = "default";
  let sceneState = "story";
  let cursor;

  let timedAnimationIndex = 0;
  let currentlyDragging = false;

  let clickedObjects = [];

  // Story text is a list of lists. The entries are image assets for the story things
  // 0: [[img1, img2]]
  // 1: [[img1],[img2]]
  let story_text = [];

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

    story1_illustration = p.loadImage(
      "assets/img/scene1/base_illustration.png"
    );
    story1_illustration = p.loadImage(
      "assets/img/scene1/base_illustration.png"
    );
    //Initialize story 1
    story_text.push([]);
    for (let i = 0; i < 13; i++) {
      story_text[0].push(p.loadImage(`assets/img/scene1/story${i}.png`));
    }
    //Initialize story 2: TODO
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    calculateCanvasDimensions(p);
    canvas1 = p.createCanvas(canvasWidth, canvasHeight).elt;
    canvas1.id = "story";
    p.noSmooth();

    //Navigation stuff
    rightButton = new Button(button_r_up, button_r_down, 503, 407);
    leftButton = new Button(button_l_up, button_l_down, 37, 407);

    //Navigate forward
    rightButton.addClickEvent(function (e) {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      harpTransitionInSound.play();

      //Given the current scene #, fade in the game with the numer, fade out the current canvas
      let canvasToShow = document.querySelector("#game" + currentSceneNum);
      canvasToShow.style.display = "block";
      canvas1.style.opacity = 0;
      window.setTimeout(function () {
        canvas1.style.display = "none";
      }, 1000);
      currentSceneNum++;
    });

    cursor = new Cursor();

    canvas1.addEventListener("mousemove", function (e) {
      mouse_x = e.offsetX;
      mouse_y = e.offsetY;
    });
    // setupScene2();
  };

  p.draw = function () {
    // console.log("STORY: " + p.mouseX + " , " + p.mouseY);
    mouse_x = p.mouseX;
    mouse_y = p.mouseY;
    //Cursor is default unless otherwise specified
    cursorState = "default";
    // p.background("green");
    if (currentSceneNum == 1) {
      displayScene1();
    }
    if (currentSceneNum == 2) {
      displayScene2();
    }
    cursor.display();
  };

  ////////////////////////////////////////////
  // -------------- SCENES --------------- //
  //////////////////////////////////////////

  // Story 1
  function displayScene1() {
    p.image(img, 0, 0, canvasWidth, canvasHeight);
    p.image(story1_illustration, 0, 0, canvasWidth, canvasHeight);
    p.image(
      story_text[0][timedAnimationIndex],
      0,
      0,
      canvasWidth,
      canvasHeight
    );
    rightButton.display(p);
    leftButton.display(p);
  }

  function displayScene2() {
    p.image(story1_illustration, 0, 0, canvasWidth, canvasHeight);
    p.image(
      story_text[1][timedAnimationIndex],
      0,
      0,
      canvasWidth,
      canvasHeight
    );
    rightButton.display(p);
    leftButton.display(p);
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
      canvas1.addEventListener("mousedown", function (e) {
        if (_this.isMouseInBounds()) {
          console.log("hello");
          console.log(currentlyDragging);
          _this.intendingToClick = true;
          clickedObjects.push(_this);
        }
      });
    }

    addClickEvent(clickFunction) {
      let _this = this;
      canvas1.addEventListener("click", function (e) {
        console.log("currently dragging");
        console.log(currentlyDragging);
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
        mouse_y < this.y * scaleRatio + this.height * scaleRatio;
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

new p5(sketch1, "canvas1");
