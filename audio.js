const pianoSampler = new Tone.Sampler({
  urls: {
    C4: "c4.wav",
    "D#4": "ds4.wav",
    "F#4": "fs4.wav",
    A4: "a4.wav",
  },
  baseUrl: "assets/sound/piano/",
  release: 0.9,
}).toDestination();
pianoSampler.volume.value = -10;

Tone.context = new AudioContext({ sampleRate: 3000 });

//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

const harpTransitionInSound = new Tone.Player(
  "assets/sound/fx/harpTransitionIn.wav"
).toDestination();

const harpTransitionOutSound = new Tone.Player(
  "assets/sound/fx/harpTransitionOut.wav"
).toDestination();

const pageFlipSound = new Tone.Player(
  "assets/sound/fx/pageflip.wav"
).toDestination();

const boingSound = new Tone.Player("assets/sound/fx/boing.mp3").toDestination();

const toySqueakSound = new Tone.Player(
  "assets/sound/fx/toySqueak.wav"
).toDestination();

const burnSound = new Tone.Player("assets/sound/fx/burn.wav").toDestination();

const runningSound = new Tone.Player(
  "assets/sound/fx/running.wav"
).toDestination();

const drawerSound = new Tone.Player(
  "assets/sound/fx/drawer.wav"
).toDestination();

const fanfareSound = new Tone.Player(
  "assets/sound/fx/fanfare.wav"
).toDestination();

const crowdWooSound = new Tone.Player(
  "assets/sound/fx/crowd-woo.wav"
).toDestination();

const partyHornSound = new Tone.Player(
  "assets/sound/fx/party-horn.wav"
).toDestination();

const fartSound = new Tone.Player("assets/sound/fx/fart.wav").toDestination();

const booSound = new Tone.Player("assets/sound/fx/boo.wav").toDestination();
const crowdSighSound = new Tone.Player(
  "assets/sound/fx/crowd-sigh.wav"
).toDestination();

const eraserSound = new Tone.Player(
  "assets/sound/fx/eraser.wav"
).toDestination();

const gulpSound = new Tone.Player("assets/sound/fx/gulp.wav").toDestination();

const chewingSound = new Tone.Player(
  "assets/sound/fx/chewing.wav"
).toDestination();

const smallApplauseSound = new Tone.Player(
  "assets/sound/fx/small-applause.wav"
).toDestination();

const magicWandSound = new Tone.Player(
  "assets/sound/fx/magic-wand.wav"
).toDestination();

const squishSound = new Tone.Player(
  "assets/sound/fx/squish.wav"
).toDestination();

const squelchSound = new Tone.Player(
  "assets/sound/fx/squelch.wav"
).toDestination();

const mmmSound = new Tone.Player("assets/sound/fx/mmm.wav").toDestination();

const fart2Sound = new Tone.Player("assets/sound/fx/fart2.wav").toDestination();

const fart3Sound = new Tone.Player("assets/sound/fx/fart3.wav").toDestination();

const dingSound = new Tone.Player("assets/sound/fx/ding.wav").toDestination();

const puzzleRightSound = new Tone.Player(
  "assets/sound/fx/puzzle-right.wav"
).toDestination();

const puzzleWrongSound = new Tone.Player(
  "assets/sound/fx/puzzle-wrong.wav"
).toDestination();

const cellphoneSounds = [
  new Tone.Player("assets/sound/fx/cellphone1.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone2.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone3.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone4.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone5.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone6.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone7.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone8.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone9.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone10.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone11.wav").toDestination(),
  new Tone.Player("assets/sound/fx/cellphone12.wav").toDestination(),
];

const keyboardSounds = [
  new Tone.Player("assets/sound/fx/keyboard1.wav").toDestination(),
  new Tone.Player("assets/sound/fx/keyboard2.wav").toDestination(),
  new Tone.Player("assets/sound/fx/keyboard3.wav").toDestination(),
  new Tone.Player("assets/sound/fx/keyboard4.wav").toDestination(),
  new Tone.Player("assets/sound/fx/keyboard5.wav").toDestination(),
  new Tone.Player("assets/sound/fx/keyboard6.wav").toDestination(),
];

const whooshSound = new Tone.Player(
  "assets/sound/fx/whoosh.wav"
).toDestination();

const metronome = new Tone.Player(
  "assets/sound/fx/woodblock.wav"
).toDestination();
metronome.volume.value = -8;

// Game scene sounds

const voiceoverDelay = 3;

const game1_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game1.wav"
).toDestination();

const game2_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game2.wav"
).toDestination();

const game3_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game3.wav"
).toDestination();

const game4_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game4.wav"
).toDestination();

const game5_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game5.wav"
).toDestination();

const game6_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game6.wav"
).toDestination();

const game7_voiceover = new Tone.Player(
  "assets/sound/game_voiceover/game7.wav"
).toDestination();

const game5_definitions = [
  {
    sound: new Tone.Player(
      "assets/sound/game_voiceover/definition0.wav"
    ).toDestination(),
    duration: 4,
    soundEffect: new Tone.Player("assets/sound/fx/twinkle.wav").toDestination(),
  },
  {
    sound: new Tone.Player(
      "assets/sound/game_voiceover/definition1.wav"
    ).toDestination(),
    duration: 4,
    soundEffect: new Tone.Player(
      "assets/sound/fx/beepboop.wav"
    ).toDestination(),
  },
  {
    sound: new Tone.Player(
      "assets/sound/game_voiceover/definition2.wav"
    ).toDestination(),
    duration: 8,
    soundEffect: new Tone.Player(
      "assets/sound/fx/clock-ticking.wav"
    ).toDestination(),
  },
];

//narrative scenes

// SOUNDTRACK
const intro_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/intro-scene.mp3"
).toDestination();

intro_soundtrack.loop = true;
intro_soundtrack.fadeOut = 4;

const game1_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/cleaning-room.mp3"
).toDestination();

game1_soundtrack.loop = true;
game1_soundtrack.fadeOut = 1;

const disco_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/disco-ball.mp3"
).toDestination();

const game2_a_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/kumon-1.mp3"
).toDestination();

game2_a_soundtrack.loop = true;
game2_a_soundtrack.fadeOut = 1;

const game2_b_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/kumon-2.mp3"
).toDestination();

game2_b_soundtrack.loop = true;
game2_b_soundtrack.fadeOut = 1;

const game4_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/painting-flute-case.mp3"
).toDestination();

game4_soundtrack.loop = true;
game4_soundtrack.fadeOut = 1;

const game6_a_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/ex-boyfriend-1.mp3"
).toDestination();

game6_a_soundtrack.loop = true;
game6_a_soundtrack.fadeOut = 1;

const game6_b_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/ex-boyfriend-2.mp3"
).toDestination();

game6_b_soundtrack.loop = true;
game6_b_soundtrack.fadeOut = 1;

const game6_c_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/ex-boyfriend-3.mp3"
).toDestination();

game6_c_soundtrack.loop = true;
game6_c_soundtrack.fadeOut = 1;

const g6_songs = [game6_a_soundtrack, game6_b_soundtrack, game6_c_soundtrack];

const game7_soundtrack = new Tone.Player(
  "assets/sound/soundtrack/college-application.mp3"
).toDestination();

// game7_soundtrack.loop = true;
