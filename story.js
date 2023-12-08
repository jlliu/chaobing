//Configuration for dev
let gameVoiceoverOn = true;
gameVoiceoverOn = false;
let pressSpaceVoiceover = false;
let currentSceneNum = 1;
let currentPartNum = 0;
//Use to debug specific scenes
// currentSceneNum = 2;

//Config Screen
let scaleRatio = 1;
let canvasWidth = 640;
let canvasHeight = 480;

let pixelDensity = 3;

let storyMode = true;

// Events
const navigateFwdEvent = new Event("navigateFwd");
const navigateBackEvent = new Event("navigateBack");

const navigateFwdStoryEvent = new Event("navigateFwdStory");
const navigateBackStoryEvent = new Event("navigateBackStory");

const resetNarrativeButtonsEvent = new Event("resetNarrativeButtons");

const restartGameEvent = new Event("restartGame");

let storyCanvas;

function launchFullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

var sketch1 = function (p) {
  let canvasRatio = canvasWidth / canvasHeight;
  let mouse_x;
  let mouse_y;
  let rightButton;
  let leftButton;
  let restartButton;
  let cursorState = "default";
  let sceneState = "story";
  let cursor;

  let timedAnimationIndex = 0;
  let currentlyAnimating = false;
  let currentlyDragging = false;
  let animatingFlip = false;
  let clickedObjects = [];
  let pageFlipTime = 900;
  let currentFlipImage = null;

  // Variables for Scenes
  let startImg;
  let openAnimation = [];
  let titleFlipAnimation = [];
  let gameStarted = false;
  let introEnded = false;
  let introDisplacement = 0;
  let narrativeButtons = [];

  let scene1_options = [];

  let scene4_options = [];

  let scene5_state = false;
  let scene5_alpha = 0;

  let scene7_options1 = [];
  let scene7_options2 = [];
  let scene7_currentOption1 = 0;
  let scene7_currentOption2 = 0;

  let introStarted = false;

  let introTitleAnimationSpritesheet;
  let introTitleAnimationSprite;
  let introTitleAnimationImgs = [];

  let introTitleAnimationSpeed = 300;

  let firstTimeStarting = true;

  let displayContinueChoice = false;

  let startIntro = function () {
    introStarted = true;
    intro_soundtrack.start();
    let delay = firstTimeStarting ? 2000 : 0;
    if (currentSceneNum == 1) {
      setTimeout(function () {
        intervalAnimation(
          introTitleAnimationSprite,
          introTitleAnimationImgs,
          introTitleAnimationSpeed,
          function () {
            startButton.interactive = true;
          }
        );
      }, delay);
    }
  };
  document.addEventListener("click", function () {
    if (!introStarted && firstTimeStarting) {
      console.log("start intro from click event");
      launchFullScreen(document.documentElement);
      startIntro();
      firstTimeStarting = false;
    }
  });

  p.preload = function () {
    plainBg = p.loadImage("assets/UI/storybook-bg.png");
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
    button_start = p.loadImage("assets/UI/buttons/button-start.png");
    button_start_h = p.loadImage("assets/UI/buttons/button-start-h.png");

    button_intro_continue = p.loadImage("assets/UI/buttons/intro-continue.png");
    button_intro_continue_h = p.loadImage(
      "assets/UI/buttons/intro-continue.png"
    );

    button_intro_start_over = p.loadImage(
      "assets/UI/buttons/intro-start-over.png"
    );
    button_intro_start_over_h = p.loadImage(
      "assets/UI/buttons/intro-start-over.png"
    );

    restart = p.loadImage("assets/UI/buttons/restart.png");
    restart_h = p.loadImage("assets/UI/buttons/restart-h.png");

    introTitleAnimationSpritesheet = p.loadImage(
      `assets/img/scenes/intro/titleAnimationSpritesheet.png`
    );

    // Opening images...
    startImg = p.loadImage("assets/img/scenes/intro/start.png");
    for (let i = 0; i < 5; i++) {
      openAnimation.push(p.loadImage(`assets/img/scenes/intro/open${i}.png`));
    }
    for (let i = 0; i < 4; i++) {
      titleFlipAnimation.push(
        p.loadImage(`assets/img/scenes/intro/flip${i}.png`)
      );
    }

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
    for (let i = 0; i < 5; i++) {
      scene7_options1.push({
        sound: scenes[6][2].voiceover_options1[i],
        img: p.loadImage(`assets/img/scenes/scene7/part3/option${i}.png`),
        img_h: p.loadImage(`assets/img/scenes/scene7/part3/option${i}-h.png`),
      });
    }
    for (let i = 5; i < 12; i++) {
      scene7_options2.push({
        sound: scenes[6][2].voiceover_options2[i - 5],
        img: p.loadImage(`assets/img/scenes/scene7/part3/option${i}.png`),
        img_h: p.loadImage(`assets/img/scenes/scene7/part3/option${i}-h.png`),
      });
    }
  };

  p.setup = function () {
    if (currentSceneNum > 1) {
      gameStarted = true;
      introEnded = true;
    }
    // put setup code here
    p.pixelDensity(pixelDensity);
    calculateCanvasDimensions(p);
    storyCanvas = p.createCanvas(canvasWidth, canvasHeight).elt;
    storyCanvas.id = "story";

    p.noSmooth();

    setupNavigation();
    setupIntro();

    cursor = new Cursor();

    setupScenes();
  };

  p.draw = function () {
    mouse_x = p.mouseX;
    mouse_y = p.mouseY;
    //Cursor is default unless otherwise specified
    cursorState = "default";

    if (storyMode) {
      if (!introStarted) {
        console.log("INTRO STARTED IS FALSE");
        // Display black screen with title before playing song
      } else if (!introEnded) {
        hideTitle();
        displayIntro();
      } else {
        displayScene(currentSceneNum, currentPartNum);

        if (currentSceneNum == 8 && currentPartNum == 3) {
          rightButton.interactive = false;
        } else {
          rightButton.display();
        }
        if (currentSceneNum != 1) {
          leftButton.display();
        }
        restartButton.display();

        cursor.display();
      }
    }

    // if (introEnded) {
    //   if (currentSceneNum == 8 && currentPartNum == 3) {
    //     rightButton.interactive = false;
    //   } else {
    //     rightButton.display();
    //   }
    //   if (currentSceneNum != 1) {
    //     leftButton.display();
    //   }
    //   restartButton.display();
    // }

    // cursor.display();
  };

  ////////////////////////////////////////////
  // -------------- SCENES --------------- //
  //////////////////////////////////////////

  // INTRO

  function setupIntro() {
    setInterval(function () {
      introDisplacement++;
    }, 500);
    startButton = new Button(button_start, button_start_h, 241, 401);
    startButton.interactive = false;
    startButton.addClickEvent(function () {
      intro_soundtrack.stop();
      startButton.interactive = false;
      gameStarted = true;
      animateIntro();
    });

    introStartOverButton = new Button(
      button_intro_start_over,
      button_intro_start_over_h,
      111,
      339
    );
    introStartOverButton.addClickEvent(function () {
      console.log("go to start scene");
      displayContinueChoice = false;
      harpTransitionInSound.start();
      introStartOverButton.interactive = false;
      introContinueButton.interactive = false;
    });
    introStartOverButton.interactive = false;
    introContinueButton = new Button(
      button_intro_continue,
      button_intro_continue_h,
      382,
      339
    );
    introContinueButton.addClickEvent(function () {
      console.log("go back to last scene");
      introEnded = true;
      gameStarted = true;
      currentSceneNum = 3;
      currentPartNum = 1;
      harpTransitionInSound.start();
      intro_soundtrack.stop();
      introStartOverButton.interactive = false;
      introContinueButton.interactive = false;
    });
    introContinueButton.interactive = false;

    introAnimationSprite = new Button(openAnimation[0], openAnimation[0], 0, 0);
    introAnimationSprite.interactive = false;
    titleFlipAnimationSprite = new Button(
      titleFlipAnimation[0],
      titleFlipAnimation[0],
      0,
      0
    );
    titleFlipAnimationSprite.interactive = false;
    titleFlipAnimationSprite.visible = false;

    // initialize animation sprites for extended intro
    for (let i = 0; i < 21; i++) {
      let height = 480;
      let img = introTitleAnimationSpritesheet.get(0, 480 * i, 640, 480);
      introTitleAnimationImgs.push(img);
    }

    introTitleAnimationSprite = new Button(
      introTitleAnimationImgs[0],
      introTitleAnimationImgs[0],
      0,
      0
    );
    introTitleAnimationSprite.interactive = false;
  }

  // Edit this to make a longer intro scene
  function displayIntro() {
    p.image(plainBg, 0, 0, canvasWidth, canvasHeight);
    //Add a case here for resetting from Over and Over and continuing from the beginning or not

    if (displayContinueChoice) {
      introStartOverButton.interactive = true;
      introContinueButton.interactive = true;
      introStartOverButton.display();
      introContinueButton.display();
      cursor.display();
      introTitleAnimationSprite.display();
    } else if (!gameStarted) {
      // Display CD case with Start button
      drawImageToScale(startImg, 0, 0 - 3 - Math.sin(introDisplacement) * 3);
      startButton.display();
      cursor.display();
      introTitleAnimationSprite.display();
    } else {
      // Animate book open
      introAnimationSprite.display();
      titleFlipAnimationSprite.display();
      cursor.display();
    }
  }

  function hideTitle() {
    document.querySelector(".titleImg").style.visibility = "hidden";
  }

  function animateIntro() {
    intervalAnimation(introAnimationSprite, openAnimation, 300, function () {
      setTimeout(function () {
        introAnimationSprite.visible = false;
        titleFlipAnimationSprite.visible = true;
        pageFlipSound.start();
        intervalAnimation(
          titleFlipAnimationSprite,
          titleFlipAnimation,
          200,
          function () {
            animateScene();
            introEnded = true;
          }
        );
      }, 2000);
    });
  }

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
      // sprite.buttonDefault = original;
      if (callback) {
        callback();
      }
    }, interval * frames.length);
  }

  //  SCENES
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
            phrase.button.display(true);
          } else {
            drawImageToScale(phrase.img_h, phrase.x, phrase.y);
          }
        } else {
          if (phrase.button) {
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
    if (scene5_state) {
      scene5_alpha += 0.03;
      p.fill(p.color(`rgba(0,0,0,${scene5_alpha})`));
      p.rect(0, 0, canvasWidth, canvasHeight);
    }
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
      if (currentSceneNum == 1) {
        // scene1_button.
        scene1_currentNum++;
        let index = scene1_currentNum % scene1_options.length;
        scene1_phrase.button.buttonDefault = scene1_options[index].img;
        scene1_phrase.button.buttonHover = scene1_options[index].img_h;
        scene1_options[index].sound.start();
      }
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
      // make sound
      if (currentSceneNum == 2) {
        scenes[1][1].voiceover_options[0].start();
      }

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
      if (currentSceneNum == 3) {
        resetGame();
      }
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
      if (currentSceneNum == 4) {
        scene4_options[0].sound.start();
        scene4_options[0].button.visible = true;
        scene4_options[0].button.interactive = true;
        scene4_phrase.button.dontInteract = true;
      }
    });

    narrativeButtons.push(scene4_phrase.button);

    //setup scene 5

    let scene5_phrase = scenes[4][1].phrases[4];
    scene5_phrase.button = new Button(
      scene5_phrase.img,
      scene5_phrase.img_h,
      scene5_phrase.x,
      scene5_phrase.y
    );
    scene5_state = false;
    scene5_phrase.button.addClickEvent(function () {
      if (currentSceneNum == 5) {
        scene5_state = true;
        scene5_phrase.button.dontInteract = true;
      }
    });

    narrativeButtons.push(scene5_phrase.button);

    //setup scene 7 !!
    let scene7_phrase1 = scenes[6][2].phrases[7];
    scene7_phrase1.button = new Button(
      scene7_phrase1.img,
      scene7_phrase1.img_h,
      scene7_phrase1.x,
      scene7_phrase1.y
    );
    scene7_phrase1.button.addClickEvent(function () {
      if (currentSceneNum == 7) {
        scene7_currentOption1++;
        let nextOption =
          scene7_options1[scene7_currentOption1 % scene7_options1.length];

        scene7_phrase1.button.buttonDefault = nextOption.img;
        scene7_phrase1.button.buttonHover = nextOption.img_h;
        nextOption.sound.start();
      }
    });
    let scene7_phrase2 = scenes[6][2].phrases[10];
    scene7_phrase2.button = new Button(
      scene7_phrase2.img,
      scene7_phrase2.img_h,
      scene7_phrase2.x,
      scene7_phrase2.y
    );
    scene7_phrase2.button.addClickEvent(function () {
      if (currentSceneNum == 7) {
        scene7_currentOption2++;
        let nextOption =
          scene7_options2[scene7_currentOption2 % scene7_options2.length];
        scene7_phrase2.button.buttonDefault = nextOption.img;
        scene7_phrase2.button.buttonHover = nextOption.img_h;
        nextOption.sound.start();
      }
    });

    let scene8_phrase = scenes[7][3].phrases[1];
    scene8_phrase.button = new Button(
      scene8_phrase.img,
      scene8_phrase.img_h,
      scene8_phrase.x,
      scene8_phrase.y
    );
    scene8_phrase.button.addClickEvent(function () {
      if (currentSceneNum == 8) {
        storyCanvas.style.display = "none";
        let video = document.querySelector("video");
        video.style.display = "block";
        video.play();
        video.addEventListener("ended", function () {
          document.dispatchEvent(navigateFwdEvent);
          let endCanvas = document.querySelector(".endCanvas");
          endCanvas.style.visibility = "visible";
        });
      }
    });
  }

  function resetScenes() {
    narrativeButtons.forEach(function (button) {
      button.interactive = false;
      button.dontInteract = false;
    });
    //reset scene 1 stuff
    scenes[0][0].phrases[4].button.buttonDefault = scene1_options[0].img;
    scenes[0][0].phrases[4].button.buttonHover = scene1_options[0].img_h;

    //reset scene 4 stuff

    scene4_options.forEach(function (option) {
      option.button.interactive = false;
      option.button.visible = false;
    });
    //reset scene5
    scene5_state = false;
    scene5_alpha = 0;

    //reset scene 7 stuff
    scenes[6][2].phrases[7].button.buttonDefault = scene7_options1[0].img;
    scenes[6][2].phrases[7].button.buttonHover = scene7_options1[0].img_h;
    scenes[6][2].phrases[10].button.buttonDefault = scene7_options2[0].img;
    scenes[6][2].phrases[10].button.buttonHover = scene7_options2[0].img_h;
    scene7_currentOption1 = 0;
    scene7_currentOption2 = 0;
  }

  //Animates the story for a given Scene
  function animateScene() {
    let cumulativeTime = 0;
    // add a delay for when the game starts
    if (currentSceneNum == 1) {
      cumulativeTime = 1500;
    }
    if (!currentlyAnimating) {
      currentlyAnimating = true;
      let parts = scenes[currentSceneNum - 1];
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
    restartButton = new Button(restart, restart_h, 22, 20);

    //Navigate forward
    rightButton.addClickEvent(function (e) {
      intro_soundtrack.stop();
      if (storyMode && introEnded) {
        currentlyAnimating = true;
        document.dispatchEvent(navigateFwdEvent);
        p.noLoop();
        harpTransitionInSound.start();
        //Given the current scene #, fade in the game with the numer, fade out the current canvas
        let canvasToShow = document.querySelectorAll(".game" + currentSceneNum);
        canvasToShow.forEach(function (canvas) {
          canvas.style.visibility = "visible";
        });
        storyCanvas.style.opacity = 0;
        window.setTimeout(function () {
          resetScenes();
          currentlyAnimating = false;
          storyCanvas.style.visibility = "hidden";
          storyMode = false;
        }, 1000);
      }
    });

    //Navigate back
    leftButton.addClickEvent(function (e) {
      if (storyMode && currentSceneNum !== 1 && introEnded) {
        currentlyAnimating = true;
        document.dispatchEvent(navigateBackEvent);
        harpTransitionInSound.start();
        p.noLoop();
        //Given the current scene #, fade in the game with the numer, fade out the current canvas
        let canvasToShow = document.querySelectorAll(
          ".game" + (currentSceneNum - 1)
        );
        canvasToShow.forEach(function (canvas) {
          canvas.style.visibility = "visible";
        });
        storyCanvas.style.opacity = 0;
        window.setTimeout(function () {
          resetScenes();
          currentlyAnimating = false;
          storyCanvas.style.visibility = "hidden";
          storyMode = false;
          currentSceneNum--;
          currentPartNum = scenes[currentSceneNum - 1].length - 1;
        }, 1000);
      }
    });

    document.addEventListener("navigateFwdStory", (e) => {
      resetScenes();
      p.loop();
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
        setTimeout(function () {
          currentlyAnimating = false;
          animateScene();
        }, 1000);
      });
    });
    document.addEventListener("navigateBackStory", (e) => {
      resetScenes();
      p.loop();
    });

    restartButton.addClickEvent(function () {
      resetGame();
    });

    document.addEventListener("restartGame", (e) => {
      console.log("restart game from event listener");
      resetGame();
    });
  }

  function resetGame() {
    // console.log("reset game function");
    // introDisplacement = 0;
    // storyMode = true;
    // startButton.interactive = true;
    // currentSceneNum = 1;
    // currentPartNum = 0;
    // gameStarted = false;
    // introEnded = false;
    // currentlyAnimating = false;
    // resetScenes();
    // location.href = location.href;

    // Change to actually reset the game

    console.log("reset game function");
    introDisplacement = 0;
    storyMode = true;
    startButton.interactive = true;
    currentSceneNum = 1;
    currentPartNum = 0;
    gameStarted = false;
    introEnded = false;
    currentlyAnimating = false;
    introStarted = false;
    introAnimationSprite.visible = true;
    titleFlipAnimationSprite.visible = false;
    p.clear();
    resetScenes();
    displayContinueChoice = true;
    setTimeout(function () {
      startIntro();
    }, 5000);
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

    display(showAsHover) {
      if (this.visible) {
        let imageToDraw = this.isMouseInBounds()
          ? this.buttonHover
          : this.buttonDefault;

        if (showAsHover) {
          imageToDraw = this.buttonHover;
        }

        drawImageToScale(imageToDraw, this.x, this.y);
        if (this.mouseInBounds && this.interactive) {
          cursorState = "pointer";
        }
      }
    }
  }

  p.keyPressed = function () {
    if (p.keyCode === 32 && pressSpaceVoiceover) {
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
