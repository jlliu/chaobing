// save this file as sketch.js
// Sketch One

let storyCanvas;
let scaleRatio = 1;
let canvasWidth = 640;
let canvasHeight = 480;
let currentlyAnimating = false;
// let currentSceneNum = 1;
let currentSceneNum = 4;
let currentPartNum = 0;

let storyMode = true;

let currentFlipImage = null;

let pageFlipTime = 900;
// pageFlipTime = 3000;

const navigateFwdEvent = new Event("navigateFwd");
const navigateBackEvent = new Event("navigateBack");

const navigateFwdStoryEvent = new Event("navigateFwdStory");

const resetNarrativeButtonsEvent = new Event("resetNarrativeButtons");

let gameVoiceoverOn = false;

let narrativeButtons = [];

// window.onload = function () {
//   window.setInterval(function () {
//     // window.frames.Displayframe.location.reload();
//     window.location.assign(window.location.href);
//   }, 10000);
// };

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

  let animatingFlip = false;

  let clickedObjects = [];

  // Story text is a list of lists. The entries are image assets for the story things
  // 0: [[img1, img2]]
  // 1: [[img1],[img2]]
  let story_text = [];

  let scene1_options = [];

  let scene4_options = [];

  p.preload = function () {
    storyBg = p.loadImage("assets/UI/storybook-bg-case.png");
    base_outline = p.loadImage("assets/UI/base-outline.png");
    bingCursor = p.loadImage("assets/UI/cursors/bing-cursor.png");
    grabCursor = p.loadImage("assets/UI/cursors/grab-cursor.png");
    holdCursor = p.loadImage("assets/UI/cursors/hold-cursor.png");
    pointCursor = p.loadImage("assets/UI/cursors/point-cursor.png");

    button_r_up = p.loadImage("assets/UI/buttons/button-r-up.png");
    button_r_down = p.loadImage("assets/UI/buttons/button-r-down.png");
    button_l_up = p.loadImage("assets/UI/buttons/button-l-up.png");
    button_l_down = p.loadImage("assets/UI/buttons/button-l-down.png");

    //Preload all of the story info. Iterate through each scene
    scenes.forEach(function (scene, sceneIndex) {
      //Iterate through each part in the scene
      scene.forEach(function (part, partIndex) {
        part.base_illustration = p.loadImage(
          `assets/img/scenes/scene${sceneIndex + 1}/part${
            partIndex + 1
          }/base_illustration.png`
        );
        let phrases = part.phrases;
        phrases.forEach(function (phrase, phraseIndex) {
          phrase.img = p.loadImage(
            `assets/img/scenes/scene${sceneIndex + 1}/part${
              partIndex + 1
            }/phrase${phraseIndex}.png`
          );
          phrase.img_h = p.loadImage(
            `assets/img/scenes/scene${sceneIndex + 1}/part${
              partIndex + 1
            }/phrase${phraseIndex}-h.png`
          );
        });
        // Get flip animation
        part.flipAnimation = [
          p.loadImage(
            `assets/img/scenes/scene${sceneIndex + 1}/part${
              partIndex + 1
            }/flip0.png`
          ),
          p.loadImage(
            `assets/img/scenes/scene${sceneIndex + 1}/part${
              partIndex + 1
            }/flip1.png`
          ),
          p.loadImage(
            `assets/img/scenes/scene${sceneIndex + 1}/part${
              partIndex + 1
            }/flip2.png`
          ),
          p.loadImage(
            `assets/img/scenes/scene${sceneIndex + 1}/part${
              partIndex + 1
            }/flip3.png`
          ),
        ];
      });
    });

    scene1_options.push({
      sound: scenes[0][0].voiceover_options[0],
      img: p.loadImage(`assets/img/scenes/scene1/part1/phrase4.png`),
      img_h: p.loadImage(`assets/img/scenes/scene1/part1/phrase4-h.png`),
    });

    scene1_options.push({
      sound: scenes[0][0].voiceover_options[1],
      img: p.loadImage(`assets/img/scenes/scene1/part1/option1.png`),
      img_h: p.loadImage(`assets/img/scenes/scene1/part1/option1-h.png`),
    });
    scene1_options.push({
      sound: scenes[0][0].voiceover_options[2],
      img: p.loadImage(`assets/img/scenes/scene1/part1/option2.png`),
      img_h: p.loadImage(`assets/img/scenes/scene1/part1/option2-h.png`),
    });

    for (let i = 0; i < 9; i++) {
      scene4_options.push({
        sound: scenes[3][1].voiceover_options[i],
        img: p.loadImage(`assets/img/scenes/scene4/part2/option${i}.png`),
        img_h: p.loadImage(`assets/img/scenes/scene4/part2/option${i}-h.png`),
      });
    }

    console.log(scene1_options);
  };

  p.setup = function () {
    // put setup code here
    p.pixelDensity(3);
    calculateCanvasDimensions(p);
    storyCanvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    storyCanvas.id = "story";
    p.noSmooth();

    setupNavigation();

    cursor = new Cursor();

    storyCanvas.addEventListener("mousemove", function (e) {
      mouse_x = e.offsetX;
      mouse_y = e.offsetY;
    });
    // setupScene2();
    // animateScene();

    setupScenes();
  };

  p.draw = function () {
    mouse_x = p.mouseX;
    mouse_y = p.mouseY;
    //Cursor is default unless otherwise specified
    cursorState = "default";
    // p.background("green");
    if (storyMode) {
      displayScene(currentSceneNum, currentPartNum);
    }

    if (currentSceneNum == 8 && currentPartNum == 3) {
      rightButton.interactive = false;
    } else {
      rightButton.display(p);
    }

    if (currentSceneNum != 1) {
      leftButton.display(p);
    }

    cursor.display();
  };

  ////////////////////////////////////////////
  // -------------- SCENES --------------- //
  //////////////////////////////////////////

  // Story 1

  function displayScene(currentSceneNum, currentPartNum) {
    p.image(storyBg, 0, 0, canvasWidth, canvasHeight);
    if (!animatingFlip) {
      drawImageToScale(
        scenes[currentSceneNum - 1][currentPartNum].base_illustration,
        20,
        70
      );
      let phrases = scenes[currentSceneNum - 1][currentPartNum].phrases;
      phrases.forEach(function (phrase) {
        if (phrase.current) {
          if (phrase.button) {
            phrase.button.buttonDefault = phrase.button.buttonHover;
            phrase.button.display();
          } else {
            drawImageToScale(phrase.img_h, phrase.x, phrase.y);
          }
        } else {
          if (phrase.button) {
            phrase.button.buttonDefault = phrase.button.originalButtonDefault;
            phrase.button.display();
            if (!phrase.button.dontInteract) {
              phrase.button.interactive = true;
            } else {
              phrase.button.interactive = false;
            }
          } else {
            drawImageToScale(phrase.img, phrase.x, phrase.y);
          }
        }
      });
    }

    drawImageToScale(base_outline, 20, 70);
    if (currentFlipImage) {
      p.image(currentFlipImage, 0, 0, canvasWidth, canvasHeight);
    }
    displayScenes();
  }

  // extra display functions for scenes
  function displayScenes() {
    // Extras
    scene4_options.forEach(function (option) {
      if (option.button.visible) {
        option.button.display();
      }
    });
  }

  function setupScenes() {
    // Setup scene 1
    let scene1_phrase = scenes[0][0].phrases[4];
    scene1_phrase.button = new Button(
      scene1_phrase.img,
      scene1_phrase.img_h,
      scene1_phrase.x,
      scene1_phrase.y
    );

    narrativeButtons.push(scene1_phrase.button);
    let scene1_currentNum = 0;

    scene1_phrase.button.addClickEvent(function () {
      // scene1_button.
      scene1_currentNum++;
      let index = scene1_currentNum % scene1_options.length;
      scene1_phrase.button.buttonDefault = scene1_options[index].img;
      scene1_phrase.button.buttonHover = scene1_options[index].img_h;
      scene1_options[index].sound.start();
    });

    // Setup scene 2
    let scene2_phrase = scenes[1][1].phrases[2];
    scene2_phrase.button = new Button(
      scene2_phrase.img,
      scene2_phrase.img_h,
      scene2_phrase.x,
      scene2_phrase.y
    );
    let scene2_state = false;

    scene2_phrase.button.addClickEvent(function () {
      console.log("click on scene2 button");
      // make sound
      scenes[1][1].voiceover_options[0].start();
      // todo: add popup
    });
    narrativeButtons.push(scene2_phrase.button);

    let scene3_phrase = scenes[2][1].phrases[3];
    scene3_phrase.button = new Button(
      scene3_phrase.img,
      scene3_phrase.img_h,
      scene3_phrase.x,
      scene3_phrase.y
    );
    scene3_phrase.button.addClickEvent(function () {
      console.log("RESET GAME");
      currentSceneNum = 1;
      currentPartNum = 0;
      resetScenes();
    });
    narrativeButtons.push(scene3_phrase.button);

    // scene 4: when main button clicked, progressively show other buttons
    // create a list of buttons for scene 4... when one is clicked, show the next one

    let scene4_phrase = scenes[3][1].phrases[3];
    scene4_phrase.button = new Button(
      scene4_phrase.img,
      scene4_phrase.img_h,
      scene4_phrase.x,
      scene4_phrase.y
    );
    // scene4_options.push(scene4_phrase.button);
    // create buttons for all the rest
    // for (var i = 0 ; i < 9; i ++){
    //   let button =
    // }
    let optionPlacements = [
      { x: 341, y: 128 },
      { x: 341, y: 184 },
      { x: 341, y: 212 },
      { x: 341, y: 268 },
      { x: 341, y: 296 },
      { x: 341, y: 325 },
      { x: 341, y: 353 },
      { x: 341, y: 381 },
      { x: 341, y: 437 },
    ];
    scene4_options.forEach(function (option, index) {
      option.button = new Button(
        option.img,
        option.img_h,
        optionPlacements[index].x,
        optionPlacements[index].y
      );
      option.button.visible = false;
      option.button.interactive = false;
      // make this one play next sound and display next button, then this one is disabled
      option.button.addClickEvent(function () {
        if (index + 1 == 9) {
          scenes[3][1].voiceover_options[9].start();
        } else {
          scene4_options[index + 1].sound.start();
          scene4_options[index + 1].button.visible = true;
          scene4_options[index + 1].button.interactive = true;
        }

        option.button.interactive = false;
      });
    });
    scene4_phrase.button.addClickEvent(function () {
      scene4_options[0].sound.start();
      scene4_options[0].button.visible = true;
      scene4_options[0].button.interactive = true;
      scene4_phrase.button.dontInteract = true;
    });

    narrativeButtons.push(scene4_phrase.button);
    resetNarrativeButtons();
  }

  function resetScenes() {
    //reset scene 1 stuff
    scenes[0][0].phrases[4].button.buttonDefault = scene1_options[0].img;
    scenes[0][0].phrases[4].button.buttonHover = scene1_options[0].img_h;

    //reset scene 4 stuff
    scenes[3][1].phrases[3].button.dontInteract = false;
    scene4_options.forEach(function (option) {
      option.button.interactive = false;
      option.button.visible = false;
    });
  }

  function setupScene2() {}

  //Animates the story for a given Scene
  function animateScene() {
    if (!currentlyAnimating) {
      currentlyAnimating = true;

      let parts = scenes[currentSceneNum - 1];
      let cumulativeTime = 0;
      console.log(currentSceneNum);
      console.log(parts);
      let delay = 1000;
      parts.forEach(function (part, partIndex) {
        let phrases = part.phrases;
        let prevPhrase = null;
        phrases.forEach(function (phrase, phraseIndex) {
          setTimeout(function () {
            //Start voiceover
            if (phraseIndex == 0) {
              part.voiceover.start();
            }
            if (prevPhrase) {
              prevPhrase.current = false;
            }
            phrase.current = true;
            prevPhrase = phrase;
          }, cumulativeTime + phrase.time);
        });
        //Part audio has ended
        setTimeout(function () {
          //reset states
          phrases.forEach(function (phrase) {
            phrase.current = false;
          });
          //Are we at last part?
          if (partIndex == parts.length - 1) {
            currentlyAnimating = false;
          } else {
            //Animate flip to next scene
            animateFlip(part, 0, function () {
              currentPartNum++;
            });
          }
        }, cumulativeTime + part.length);

        cumulativeTime += part.length + pageFlipTime + delay;
      });
    }
  }

  function animateFlip(part, delay, callback) {
    setTimeout(function () {
      //Animate flip 0
      pageFlipSound.start();
      animatingFlip = true;

      currentFlipImage = part.flipAnimation[0];
    }, pageFlipTime * 0.2 + delay);
    setTimeout(function () {
      //Animate flip 1
      currentFlipImage = part.flipAnimation[1];
    }, pageFlipTime * 0.4 + delay);
    setTimeout(function () {
      //Animate flip 2
      currentFlipImage = part.flipAnimation[2];
    }, pageFlipTime * 0.6 + delay);
    setTimeout(function () {
      //Animate flip 3
      currentFlipImage = part.flipAnimation[3];
    }, pageFlipTime * 0.8 + delay);
    setTimeout(function () {
      //Rest to null

      currentFlipImage = null;
      if (callback) {
        animatingFlip = false;
        callback();
      }
    }, pageFlipTime + delay);
  }
  function setupNavigation() {
    //Navigation stuff
    rightButton = new Button(button_r_up, button_r_down, 503, 407);
    leftButton = new Button(button_l_up, button_l_down, 37, 407);

    //Navigate forward
    rightButton.addClickEvent(function (e) {
      if (storyMode) {
        document.dispatchEvent(navigateFwdEvent);

        harpTransitionInSound.start();
        //Given the current scene #, fade in the game with the numer, fade out the current canvas
        let canvasToShow = document.querySelectorAll(".game" + currentSceneNum);
        canvasToShow.forEach(function (canvas) {
          canvas.style.visibility = "visible";
        });
        storyCanvas.style.opacity = 0;
        window.setTimeout(function () {
          storyCanvas.style.visibility = "hidden";
          storyMode = false;
          resetScenes();
        }, 1000);
      }
    });

    //Navigate back
    leftButton.addClickEvent(function (e) {
      if (storyMode && currentSceneNum !== 1) {
        document.dispatchEvent(navigateBackEvent);
        harpTransitionInSound.start();

        //Given the current scene #, fade in the game with the numer, fade out the current canvas
        let canvasToShow = document.querySelectorAll(
          ".game" + (currentSceneNum - 1)
        );
        canvasToShow.forEach(function (canvas) {
          canvas.style.visibility = "visible";
        });
        storyCanvas.style.opacity = 0;
        window.setTimeout(function () {
          storyCanvas.style.visibility = "hidden";
          storyMode = false;
          currentSceneNum--;
          currentPartNum = scenes[currentSceneNum - 1].length - 1;
        }, 1000);
      }
    });

    document.addEventListener("navigateFwdStory", (e) => {
      currentlyAnimating = true;
      let delay = 1000;
      let part = scenes[currentSceneNum - 1][currentPartNum];
      //Animate the previous one into the new one and then incremetnt to current scene
      animateFlip(part, delay, function () {
        //Rest to null
        currentSceneNum++;
        currentPartNum = 0;
        currentFlipImage = null;
        //make all buttons non interactive
        resetNarrativeButtons();
        setTimeout(function () {
          currentlyAnimating = false;
          animateScene();
        }, 1000);
      });
    });
    document.addEventListener("resetNarrativeButtons", (e) => {
      resetNarrativeButtons();
    });
  }

  function resetNarrativeButtons() {
    //make all buttons non interactive
    narrativeButtons.forEach(function (button) {
      button.interactive = false;
      button.dontInteract = false;
    });
    //reset scenes while we are at it
    resetScenes();
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
      this.originalButtonDefault = buttonDefaultImg;
      this.buttonDefault = buttonDefaultImg;
      this.buttonHover = buttonHover;
      this.width = buttonDefaultImg.width;
      this.height = buttonDefaultImg.height;
      this.mouseInBounds = false;
      this.interactive = true;
      this.intendingToClick = false;
      this.visible = true;
      let _this = this;
      storyCanvas.addEventListener("mousedown", function (e) {
        if (_this.isMouseInBounds()) {
          _this.intendingToClick = true;
          clickedObjects.push(_this);
        }
      });
    }

    addClickEvent(clickFunction) {
      let _this = this;
      storyCanvas.addEventListener("click", function (e) {
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
        !currentlyAnimating &&
        this.interactive &&
        mouse_x > this.x * scaleRatio &&
        mouse_x < this.x * scaleRatio + this.width * scaleRatio &&
        mouse_y > this.y * scaleRatio &&
        mouse_y < this.y * scaleRatio + this.height * scaleRatio;
      return this.mouseInBounds;
    }

    display() {
      if (this.visible) {
        let imageToDraw = this.isMouseInBounds()
          ? this.buttonHover
          : this.buttonDefault;

        drawImageToScale(imageToDraw, this.x, this.y);
        if (this.mouseInBounds && this.interactive) {
          cursorState = "pointer";
        }
      }
    }
  }

  p.keyPressed = function () {
    if (p.keyCode === 32) {
      console.log("press space");
      // timedAnimation(scene1.timings);
      animateScene();
    }
  };

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

new p5(sketch1, "canvas-story");
