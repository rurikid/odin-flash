const AudioEffects = {
  TitleMusic: '../audio/OfGodsAndPhilosophers/OfGodsAndPhilosophers_Short1(loop)(120).wav',
  Target: '../audio/TomWinandySFX_UI_ScifiTech_Button-Select_01.wav',
  Select: '../audio/TomWinandySFX_UI_ScifiTech_Button-Select_05.wav',
  Correct: '../audio/TomWinandySFX_UI_ScifiTech_Confirm_03.wav',
  Incorrect: '../audio/TomWinandySFX_UI_ScifiTech_Cancel_01.wav',
  NewDeck: '../audio/TomWinandySFX_UI_SciFiTech_Swipe_14.wav',
  GameOverMusic: '../audio/OfGodsAndPhilosophers/OfGodsAndPhilosophers_Short1(loop)(120).wav',
  GameplayMusic:'../audio/OfGodsAndPhilosophers/OfGodsAndPhilosophers(loop)(120).wav',
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
  GameplayMusic: null
}

const InitAudio = () => {
  for (let key in AudioEffects) {
    loadAudio(AudioEffects[key]);
  }
}

const PlayAudio = (audioEffect, repeat) => {
  if (audioBuffer[audioEffect] === undefined) {
    loadAudio(audioEffect);
  }

  console.log(audioEffect);

  var source = audioContext.createBufferSource();
  source.loop = repeat;
  source.buffer = audioBuffer[audioEffect];
  source.connect(audioContext.destination);
  source.start(0);
}

const StopAudio = (audioEffect) => {
  var source = audioContext.createBufferSource();

  source.buffer = audioBuffer[audioEffect];
  source.connect(audioContext.destination);
  // source.stop(0);

  audioContext.suspend();
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

export { InitAudio, AudioEffects, PlayAudio, StopAudio };