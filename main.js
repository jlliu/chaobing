let canvasEl;
let scaleRatio = 1;
let canvasWidth = 640;
let canvasHeight = 480;
let canvasRatio = canvasWidth / canvasHeight;

let rightButton;
let leftButton;
let cursorState = "default";
let sceneState = "story";

let currentlyAnimating = false;
let timedAnimationIndex = 0;
let currentSceneNum = 1;
let currentlyDragging = false;

let clickedObjects = [];

let mouse_x;
let mouse_y;

//Audio
let track;
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
let harpTransitionInSound, harpTransitionOutSound;

let story1_text = [];

function setup() {
  // put setup code here
  pixelDensity(3);
  calculateCanvasDimensions();
  canvasEl = createCanvas(canvasWidth, canvasHeight).elt;
  noSmooth();

  //Navigation stuff
  rightButton = new Button(button_r_up, button_r_down, 503, 407);
  leftButton = new Button(button_l_up, button_l_down, 37, 407);
  rightButton.addClickEvent(function (e) {
    console.log(" this is the function we're adding");

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    console.log(sceneState);
    sceneState == "story"
      ? harpTransitionInSound.play()
      : harpTransitionOutSound.play();
    currentSceneNum++;
    // harpTransitionInSound.play();
  });

  cursor = new Cursor();

  // get the audio element
  harpTransitionInSound = document.querySelector("#harpTransitionIn");
  harpTransitionOutSound = document.querySelector("#harpTransitionOut");
  pageFlipSound = document.querySelector("#pageFlip");
  // pass it into the audio context
  track = audioContext.createMediaElementSource(harpTransitionInSound);
  track.connect(audioContext.destination);

  setupScene2();
}

// Keep draw function simple
function draw() {
  mouse_x = mouseX;
  mouse_y = mouseY;
  //Cursor is default unless otherwise specified
  cursorState = "default";

  background("green");
  if (currentSceneNum == 1) {
    displayScene1();
  }
  if (currentSceneNum == 2) {
    // console.log("next scene");
    sceneState = "game";
    displayScene2();
  }

  cursor.display();
}

// ------------- CODE FOR SCENES -------------

// Story 1
function displayScene1() {
  image(img, 0, 0, canvasWidth, canvasHeight);
  image(story1_illustration, 0, 0, canvasWidth, canvasHeight);
  image(story1_text[timedAnimationIndex], 0, 0, canvasWidth, canvasHeight);
  rightButton.display();
  leftButton.display();
}

// Game 1

function setupScene2() {
  //Initialize Game 1 Sprites
  g1_drawerSprite = new Button(g1_drawer, g1_drawer, 390, 50);
  g1_drawerSprite.addClickEvent(function (e) {
    g1_drawerSprite.buttonDefault = g1_drawer2;
    g1_drawerSprite.buttonHover = g1_drawer2;
    g1_drawerSprite.interactive = false;
    pageFlipSound.play();
  });
  g1_posterSprite = new Button(g1_poster, g1_poster, 30, 30);
  g1_posterSprite.addClickEvent(function (e) {
    g1_posterSprite.buttonDefault = g1_poster2;
    g1_posterSprite.buttonHover = g1_poster2;
    g1_posterSprite.interactive = false;
    pageFlipSound.play();
  });
  g1_blanketSprite = new Button(g1_blanket, g1_blanket, 110, 120);
  g1_blanketSprite.addClickEvent(function (e) {
    g1_blanketSprite.buttonDefault = g1_blanket2;
    g1_blanketSprite.buttonHover = g1_blanket2;
    g1_blanketSprite.interactive = false;
    pageFlipSound.play();
  });
  g1_pillowSprite = new Draggable(
    g1_pillow,
    g1_pillow,
    470,
    300,
    250,
    100,
    [138, 424],
    [60, 340]
  );
  g1_shirtSprite = new Draggable(
    g1_shirt,
    g1_shirt,
    46,
    294,
    null,
    null,
    [34, 170],
    [150, 263]
  );
  g1_skirtSprite = new Draggable(
    g1_skirt,
    g1_skirt,
    360,
    392,
    null,
    null,
    [34, 170],
    [150, 263]
  );
}
function displayScene2() {
  image(g1_bg, 0, 0, canvasWidth, canvasHeight);
  // drawImageToScale(g1_drawer, 390, 50, g1_drawer.width, g1_drawer.height);
  g1_drawerSprite.display();
  g1_posterSprite.display();
  g1_blanketSprite.display();
  g1_pillowSprite.display();
  g1_shirtSprite.display();
  g1_skirtSprite.display();

  //detect if drawer clicked, then we swich the image.
  rightButton.display();
  leftButton.display();
}
