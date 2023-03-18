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
}
