let g1_bg,
  g1_blanket,
  g1_blanket2,
  g1_drawer,
  g1_drawer2,
  g1_panda,
  g1_pillow,
  g1_poster,
  g1_poster2,
  g1_shirt,
  g1_skirt,
  g1_drawerSprite,
  g1_posterSprite;

function g1_preload() {
  //game 1 assets
  g1_bg = loadImage("assets/img/game1/bg.png");
  g1_blanket = loadImage("assets/img/game1/blanket.png");
  g1_blanket2 = loadImage("assets/img/game1/blanket2.png");
  g1_drawer = loadImage("assets/img/game1/drawer.png");
  g1_drawer2 = loadImage("assets/img/game1/drawer2.png");
  g1_panda = loadImage("assets/img/game1/panda.png");
  g1_pillow = loadImage("assets/img/game1/pillow.png");
  g1_poster = loadImage("assets/img/game1/poster.png");
  g1_poster2 = loadImage("assets/img/game1/poster2.png");
  g1_shirt = loadImage("assets/img/game1/shirt.png");
  g1_skirt = loadImage("assets/img/game1/skirt.png");

  //Initialize Game 1 Sprites
  g1_drawerSprite = new Button(g1_drawer, g1_drawer, 390, 50);
  g1_drawerSprite.addClickEvent(function (e) {
    console.log("adding click event drawer");
    g1_drawerSprite.buttonDefault = g1_drawer2;
    g1_drawerSprite.buttonHover = g1_drawer2;
    g1_drawerSprite.interactive = false;
  });
  g1_posterSprite = new Button(g1_poster, g1_poster, 30, 30);
  console.log(g1_poster);
  g1_posterSprite.addClickEvent(function (e) {
    g1_posterSprite.buttonDefault = g1_poster2;
    g1_posterSprite.buttonHover = g1_poster2;
    g1_posterSprite.interactive = false;
  });
}

let g1_states = {
  drawerDone: false,
  blanketDone: false,
  shirtDone: false,
  skirtDone: false,
  posterDone: false,
  pillowDone: false,
};

// Game 1
function displayScene2() {
  image(g1_bg, 0, 0, canvasWidth, canvasHeight);

  // drawImageToScale(g1_drawer, 390, 50, g1_drawer.width, g1_drawer.height);
  g1_drawerSprite.display();
  g1_posterSprite.display();
  //detect if drawer clicked, then we swich the image.
  rightButton.display();
  leftButton.display();
}
