const AudioEffects = {
  TitleMusic: '../audio/TitleMusic.wav',
  Target: '../audio/TargetEffect.wav',
  Select: '../audio/SelectEffect.wav',
  Correct: '../audio/CorrectEffect.wav',
  Incorrect: '../audio/IncorrectEffect.wav',
  NewDeck: '../audio/NewDeckEffect.wav',
  GameOverMusic: '../audio/TitleMusic.wav',
  GameplayMusic:'../audio/GameplayMusic.wav',
}

const audioContext = new AudioContext();

let audioBuffer = {
  TitleMusic: null,
  Target: null,
  Select: null,
  Correct: null,
  Incorrect: null,
  NewDeck: null,
  GameOverMusic: null,
  GameplayMusic: null,
  Test: null
}

let musicSource = null;

const InitAudio = () => {
  for (let key in AudioEffects) {
    loadAudio(AudioEffects[key]);
  }
}

const PlayEffect = (audioEffect) => {
  if (audioBuffer[audioEffect] === undefined) {
    loadAudio(audioEffect);
  }

  let gainNode = audioContext.createGain();

  let source = audioContext.createBufferSource();
  source.buffer = audioBuffer[audioEffect];
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = 2;

  source.start(0);
}

const PlayMusic = (audioEffect, repeat) => {
  if (audioBuffer[audioEffect] === undefined) {
    loadAudio(audioEffect);
  }

  musicSource = audioContext.createBufferSource();
  musicSource.loop = repeat;
  musicSource.buffer = audioBuffer[audioEffect];
  musicSource.connect(audioContext.destination);
  musicSource.start(0);
}

const TransitionMusic = (audioEffect, repeat) => {
  if (musicSource === null) {
    PlayMusic(audioEffect, repeat);
    return;
  }

  if (audioBuffer[audioEffect] === undefined) {
    loadAudio(audioEffect);
  }

  let newSource = audioContext.createBufferSource();
  newSource.loop = repeat;
  newSource.buffer = audioBuffer[audioEffect];

  let newGain = audioContext.createGain();
  let oldGain = audioContext.createGain();

  newSource.connect(newGain);
  musicSource.connect(oldGain);

  newGain.connect(audioContext.destination);
  oldGain.connect(audioContext.destination);

  newGain.gain.setValueAtTime(0, audioContext.currentTime);
  newSource.start(0);

  oldGain.gain.linearRampToValueAtTime(-1, audioContext.currentTime + 2);
  newGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 2);
  setTimeout(function() { 
    musicSource = newSource;
  }, 3000);
}

const StopMusic = () => {
  let gainNode = audioContext.createGain();

  musicSource.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.linearRampToValueAtTime(-1, audioContext.currentTime + 2);
}

const loadAudio = (audioEffect) => {
  var request = new XMLHttpRequest();
  request.open('GET', audioEffect, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
      audioBuffer[audioEffect] = buffer;
    });
  }

  request.send();
}

export { InitAudio, AudioEffects, PlayMusic, PlayEffect, StopMusic, TransitionMusic };