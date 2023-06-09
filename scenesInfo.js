let scenes = [
  //Scene 1, may contain multiple parts
  [
    //part 1: each part is a list of phrases that have images and also timings
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene1.wav"
      ).toDestination(),
      voiceover_options: [
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene1a.wav"
        ).toDestination(),

        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene1a.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene1b.wav"
        ).toDestination(),
      ],
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 8777,
      phrases: [
        { time: 0, x: 73, y: 144, img: null, img_h: null }, //0: My grandma used
        { time: 880, x: 73, y: 171, img: null, img_h: null }, //1: to view cleaning
        { time: 1763, x: 73, y: 199, img: null, img_h: null }, //2: as a meditative
        { time: 2806, x: 73, y: 228, img: null, img_h: null }, //3: activity
        { time: 4486, x: 350, y: 108, img: null, img_h: null }, //4: Nai nai
        { time: 5303, x: 436, y: 111, img: null, img_h: null }, //5: Would say that
        { time: 5932, x: 350, y: 140, img: null, img_h: null }, //6: if my space was cluttered
        { time: 7341, x: 350, y: 167, img: null, img_h: null }, //7: then my mind would be
        { time: 7939, x: 350, y: 196, img: null, img_h: null }, //8: culttered too
      ],
      flipAnimation: [],
    },
  ],
  [
    //scene 2: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene2-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6329,
      phrases: [
        { time: 0, x: 50, y: 112, img: null, img_h: null }, //0: Unfortunately
        { time: 967, x: 50, y: 140, img: null, img_h: null }, //1: I can get pretty
        { time: 1836, x: 50, y: 168, img: null, img_h: null }, //2: messy these days
        { time: 3414, x: 456, y: 147, img: null, img_h: null }, //3: I get too busy
        { time: 4300, x: 458, y: 176, img: null, img_h: null }, //4: to even think
        { time: 5258, x: 449, y: 205, img: null, img_h: null }, //0: let alone clean
      ],
      flipAnimation: [],
    },
    //scene2: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene2-part2.wav"
      ).toDestination(),
      voiceover_options: [
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene2-part2-option0.wav"
        ).toDestination(),
      ],
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 5892,
      phrases: [
        { time: 0, x: 45, y: 201, img: null, img_h: null }, //0: I find myself frazzled
        { time: 1294, x: 45, y: 228, img: null, img_h: null }, //1: by constantly
        { time: 1826, x: 45, y: 256, img: null, img_h: null }, //2: hustling
        { time: 3352, x: 480, y: 272, img: null, img_h: null }, //3: it's sometimes
        { time: 4191, x: 459, y: 298, img: null, img_h: null }, //4: Like I don't know
        { time: 4954, x: 468, y: 326, img: null, img_h: null }, //0: how else to be
      ],
      flipAnimation: [],
    },
  ],
  //Scene3
  [
    //scene 3: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene3-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 4731,
      phrases: [
        { time: 0, x: 47, y: 98, img: null, img_h: null }, //0: In my twenty
        { time: 647, x: 47, y: 125, img: null, img_h: null }, //1: something years
        { time: 1321, x: 47, y: 153, img: null, img_h: null }, //2: of being alive
        { time: 2315, x: 392, y: 180, img: null, img_h: null }, //3: I got pretty good
        { time: 3290, x: 392, y: 207, img: null, img_h: null }, //4: at doing what
        { time: 3690, x: 415, y: 236, img: null, img_h: null }, //5: i'm supposed to
      ],
      flipAnimation: [],
    },
    //scene3: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene3-part2.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6530,
      phrases: [
        { time: 0, x: 56, y: 104, img: null, img_h: null }, //0: I follow the rules
        { time: 1540, x: 131, y: 329, img: null, img_h: null }, //1: I stick to the script
        { time: 3160, x: 345, y: 94, img: null, img_h: null }, //2: I try
        { time: 4066, x: 395, y: 94, img: null, img_h: null }, //3:over and over
        { time: 5523, x: 441, y: 325, img: null, img_h: null }, //4: until i get it right
      ],
      flipAnimation: [],
    },
  ],

  //Scene4
  [
    //scene 4: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene4-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 5721,
      phrases: [
        { time: 0, x: 73, y: 146, img: null, img_h: null }, //0: But these days
        { time: 1115, x: 73, y: 174, img: null, img_h: null }, //1: I feel like i'm on
        { time: 1893, x: 73, y: 201, img: null, img_h: null }, //2: a treadmill that
        { time: 2615, x: 73, y: 230, img: null, img_h: null }, //3: never stops
        { time: 4140, x: 375, y: 100, img: null, img_h: null }, //4: theres always something
        { time: 4991, x: 464, y: 128, img: null, img_h: null }, //5: to chase next
      ],
      flipAnimation: [],
    },
    //scene4: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene4-part2.wav"
      ).toDestination(),
      voiceover_options: [
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option0.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option1.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option2.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option3.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option4.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option5.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option6.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option7.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option8.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene4-part2-option9.wav"
        ).toDestination(),
      ],
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6530,
      phrases: [
        { time: 0, x: 48, y: 97, img: null, img_h: null }, //0: something i need to achieve
        { time: 1620, x: 132, y: 127, img: null, img_h: null }, //1: to acquire
        { time: 2711, x: 213, y: 154, img: null, img_h: null }, //2: to make
        { time: 4372, x: 341, y: 99, img: null, img_h: null }, //3:  i need to apply to a new job..
      ],
      flipAnimation: [],
    },
  ],

  //Scene5
  [
    //scene 5: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene5-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6934,
      phrases: [
        { time: 0, x: 45, y: 108, img: null, img_h: null }, //0: Maybe im always
        { time: 797, x: 45, y: 136, img: null, img_h: null }, //1: doing so much
        { time: 1624, x: 45, y: 164, img: null, img_h: null }, //2: to find something
        { time: 2353, x: 45, y: 192, img: null, img_h: null }, //3: to hold onto
        { time: 3880, x: 450, y: 170, img: null, img_h: null }, //4: mabye a lot of
        { time: 4512, x: 474, y: 198, img: null, img_h: null }, //5: what i do is
        { time: 5092, x: 443, y: 225, img: null, img_h: null }, //6: a battle against
        { time: 5922, x: 494, y: 256, img: null, img_h: null }, //7: emptiness
      ],
      flipAnimation: [],
    },
    //scene5: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene5-part2.wav"
      ).toDestination(),

      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6591,
      phrases: [
        { time: 0, x: 58, y: 168, img: null, img_h: null }, //0: the older i get
        { time: 970, x: 58, y: 196, img: null, img_h: null }, //1: the more i feel like
        { time: 1750, x: 58, y: 224, img: null, img_h: null }, //2: people and memories
        { time: 3143, x: 58, y: 252, img: null, img_h: null }, //3: just fade away
        { time: 4992, x: 490, y: 292, img: null, img_h: null }, //4: whats left
        { time: 5565, x: 467, y: 321, img: null, img_h: null }, //5: when they do
      ],
      flipAnimation: [],
    },
  ],
  //Scene6
  [
    //scene 6: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene6-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 4247,
      phrases: [
        { time: 0, x: 36, y: 101, img: null, img_h: null }, //0: i sometimes wonder
        { time: 893, x: 353, y: 162, img: null, img_h: null }, //1: what life would be like
        { time: 1793, x: 339, y: 193, img: null, img_h: null }, //2: if my family grew up
        { time: 2865, x: 353, y: 224, img: null, img_h: null }, //3: around more people like us
      ],
      flipAnimation: [],
    },
    //scene5: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene6-part2.wav"
      ).toDestination(),

      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 9562,
      phrases: [
        { time: 0, x: 55, y: 110, img: null, img_h: null }, //0: would i be
        { time: 600, x: 55, y: 139, img: null, img_h: null }, //1: more used to
        { time: 1005, x: 55, y: 166, img: null, img_h: null }, //2: to belonging
        { time: 2400, x: 197, y: 208, img: null, img_h: null }, //3: would i not
        { time: 2830, x: 154, y: 236, img: null, img_h: null }, //4:  feel like i'm just
        { time: 3706, x: 183, y: 264, img: null, img_h: null }, //5:  a big weirdo
        { time: 4720, x: 192, y: 292, img: null, img_h: null }, //6: deep down
        { time: 6247, x: 353, y: 98, img: null, img_h: null }, //7: would i not  have the belief
        { time: 7537, x: 375, y: 126, img: null, img_h: null }, //8: that some things just
        { time: 8700, x: 407, y: 330, img: null, img_h: null }, //9:  aren't for me
      ],
      flipAnimation: [],
    },
  ],
  //Scene7
  [
    //scene 7: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene7-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 5643,
      phrases: [
        { time: 0, x: 45, y: 93, img: null, img_h: null }, //0: i seem to manage
        { time: 1131, x: 45, y: 121, img: null, img_h: null }, //1: most parts of my life
        { time: 3298, x: 344, y: 302, img: null, img_h: null }, //2: but i feel so behind
        { time: 4696, x: 344, y: 332, img: null, img_h: null }, //3: in the world of love.
      ],
      flipAnimation: [],
    },
    //scene7: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene7-part2.wav"
      ).toDestination(),

      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 7106,
      phrases: [
        { time: 0, x: 40, y: 140, img: null, img_h: null }, //0: i feel like i can
        { time: 900, x: 40, y: 168, img: null, img_h: null }, //1: only spectate it
        { time: 1893, x: 40, y: 196, img: null, img_h: null }, //2: from a distance
        { time: 3259, x: 45, y: 281, img: null, img_h: null }, //3: like all the normal
        { time: 4080, x: 69, y: 311, img: null, img_h: null }, //4: people are behind one wall
        { time: 5541, x: 462, y: 293, img: null, img_h: null }, //5: and i'm stuck on
        { time: 6099, x: 475, y: 322, img: null, img_h: null }, //6: the other side
      ],
      flipAnimation: [],
    },

    //scene7: part 3
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene7-part3.wav"
      ).toDestination(),
      voiceover_options1: [
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option0.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option1.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option2.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option3.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option4.wav"
        ).toDestination(),
      ],
      voiceover_options2: [
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option5.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option6.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option7.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option8.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option9.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option10.wav"
        ).toDestination(),
        new Tone.Player(
          "assets/sound/game_voiceover/narration-scene7-option11.wav"
        ).toDestination(),
      ],
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 14478,
      phrases: [
        { time: 0, x: 47, y: 94, img: null, img_h: null }, //0: i'll linger on the stale crumbs
        { time: 1636, x: 47, y: 124, img: null, img_h: null }, //1: from situations years ago.
        { time: 3928, x: 47, y: 274, img: null, img_h: null }, //2: i'll replay every single
        { time: 5336, x: 47, y: 301, img: null, img_h: null }, //3:  moment, searching for what
        { time: 6202, x: 47, y: 330, img: null, img_h: null }, //4: I could've done wrong.
        { time: 8886, x: 351, y: 134, img: null, img_h: null }, //5: Mabye if i had just been
        { time: 10125, x: 351, y: 163, img: null, img_h: null }, //6: less
        { time: 10396, x: 386, y: 163, img: null, img_h: null }, //7: needy
        { time: 12023, x: 351, y: 249, img: null, img_h: null }, //8: Mabye if i were
        { time: 13254, x: 351, y: 280, img: null, img_h: null }, //9: more
        { time: 13483, x: 402, y: 277, img: null, img_h: null }, //10: put together
      ],
      flipAnimation: [],
    },
  ],
  //Scene8
  [
    //scene 8: part 1
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene8-part1.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6024,
      phrases: [
        { time: 0, x: 50, y: 94, img: null, img_h: null }, //0: but lately
        { time: 583, x: 50, y: 121, img: null, img_h: null }, //1: ive been hitting a wall
        { time: 1488, x: 352, y: 269, img: null, img_h: null }, //2: with proving myself
        { time: 3091, x: 352, y: 296, img: null, img_h: null }, //3: playing it safe
        { time: 4478, x: 352, y: 323, img: null, img_h: null }, //4: and doing things correctly
      ],
      flipAnimation: [],
    },
    //scene8: part 2
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene8-part2.wav"
      ).toDestination(),

      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6575,
      phrases: [
        { time: 0, x: 50, y: 91, img: null, img_h: null }, //0: i imagine life will
        { time: 1282, x: 50, y: 116, img: null, img_h: null }, //1: fall into palace
        { time: 2564, x: 50, y: 141, img: null, img_h: null }, //2: once i do the
        { time: 3098, x: 50, y: 166, img: null, img_h: null }, //3: next big thing
        { time: 4823, x: 364, y: 326, img: null, img_h: null }, //4: but ill end up where i started
      ],
      flipAnimation: [],
    },

    //scene8: part 3
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene8-part3.wav"
      ).toDestination(),

      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 6989,
      phrases: [
        { time: 0, x: 50, y: 103, img: null, img_h: null }, //0: i go through the motions
        { time: 1382, x: 136, y: 314, img: null, img_h: null }, //1: but it still feels like
        { time: 2254, x: 347, y: 103, img: null, img_h: null }, //2: i cant really access
        { time: 3764, x: 347, y: 129, img: null, img_h: null }, //3:  the whole living a life thing
        { time: 5675, x: 395, y: 328, img: null, img_h: null }, //4: that others seem to do
      ],
      flipAnimation: [],
    },
    //scene8: part 4
    {
      voiceover: new Tone.Player(
        "assets/sound/game_voiceover/narration-scene8-part4.wav"
      ).toDestination(),
      base_illustration: null,
      //populate phrases with objects of time and also images for each phrase, and locations
      length: 2804,
      phrases: [
        { time: 0, x: 58, y: 100, img: null, img_h: null }, //0: i need to just
        { time: 719, x: 171, y: 98, img: null, img_h: null }, //1: move forward
        { time: 1695, x: 347, y: 320, img: null, img_h: null }, //2: but i dont nokw what to do
      ],
      flipAnimation: [],
    },
  ],
];
