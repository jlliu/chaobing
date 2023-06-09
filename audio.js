const pianoSampler = new Tone.Sampler({
  urls: {
    C4: "C4.wav",
    "D#4": "Ds4.wav",
    "F#4": "Fs4.wav",
    A4: "A4.wav",
  },
  baseUrl: "assets/sound/piano/",
  release: 0.9,
}).toDestination();
pianoSampler.volume.value = -10;

Tone.context = new AudioContext({ sampleRate: 3000 });

//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

const harpTransitionInSound = new Tone.Player(
  "assets/sound/harpTransitionIn.wav"
).toDestination();

const harpTransitionOutSound = new Tone.Player(
  "assets/sound/harpTransitionOut.wav"
).toDestination();

const pageFlipSound = new Tone.Player(
  "assets/sound/pageflip.wav"
).toDestination();

const boingSound = new Tone.Player("assets/sound/boing.mp3").toDestination();

const toySqueakSound = new Tone.Player(
  "assets/sound/toySqueak.wav"
).toDestination();

const burnSound = new Tone.Player("assets/sound/burn.wav").toDestination();

const runningSound = new Tone.Player(
  "assets/sound/running.wav"
).toDestination();

const metronome = new Tone.Player("assets/sound/woodblock.wav").toDestination();
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
  },
  {
    sound: new Tone.Player(
      "assets/sound/game_voiceover/definition1.wav"
    ).toDestination(),
    duration: 4,
  },
  {
    sound: new Tone.Player(
      "assets/sound/game_voiceover/definition2.wav"
    ).toDestination(),
    duration: 8,
  },
];

//narrative scenes
