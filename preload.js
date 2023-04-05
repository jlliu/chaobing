function preload() {
  img = loadImage("assets/UI/storybook-bg-case.png");
  bingCursor = loadImage("assets/UI/cursors/bing-cursor.png");
  grabCursor = loadImage("assets/UI/cursors/grab-cursor.png");
  holdCursor = loadImage("assets/UI/cursors/hold-cursor.png");
  pointCursor = loadImage("assets/UI/cursors/point-cursor.png");

  button_r_up = loadImage("assets/UI/buttons/button-r-up.png");
  button_r_down = loadImage("assets/UI/buttons/button-r-down.png");
  button_l_up = loadImage("assets/UI/buttons/button-l-up.png");
  button_l_down = loadImage("assets/UI/buttons/button-l-down.png");

  story1_illustration = loadImage("assets/img/scene1/base_illustration.png");
  story1_illustration = loadImage("assets/img/scene1/base_illustration.png");
  for (let i = 0; i < 13; i++) {
    story1_text.push(loadImage(`assets/img/scene1/story${i}.png`));
  }

  //game 1 assets
  bg = loadImage("assets/img/game1/bg.png");
  blanket = loadImage("assets/img/game1/blanket.png");
  blanket2 = loadImage("assets/img/game1/blanket2.png");
  drawer = loadImage("assets/img/game1/drawer.png");
  drawer2 = loadImage("assets/img/game1/drawer2.png");
  panda = loadImage("assets/img/game1/panda.png");
  pillow = loadImage("assets/img/game1/pillow.png");
  poster = loadImage("assets/img/game1/poster.png");
  poster2 = loadImage("assets/img/game1/poster2.png");
  shirt = loadImage("assets/img/game1/shirt.png");
  skirt = loadImage("assets/img/game1/skirt.png");
}
