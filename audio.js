//Audio
let track;
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
let harpTransitionInSound, harpTransitionOutSound, boingSound;
// get the audio element
harpTransitionInSound = document.querySelector("#harpTransitionIn");
harpTransitionOutSound = document.querySelector("#harpTransitionOut");
pageFlipSound = document.querySelector("#pageFlip");
boingSound = document.querySelector("#boing");
// pass it into the audio context
track = audioContext.createMediaElementSource(harpTransitionInSound);
track.connect(audioContext.destination);
