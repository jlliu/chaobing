const pianoSampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

// Tone.loaded().then(() => {
// 	sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 0.5);
// })

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

// Tone.loaded().then(() => {
//   harpTransitionInSound.start();
// });
