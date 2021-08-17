import { ScreenChange } from "../../index.js";
import { GameConstants } from "../GameState.js";
import { PlayEffect, AudioEffects } from "../Audio.js";

let lockout = true;
const ContinuePrompt = "continuePrompt";

const TitleScreen = () => {
  lockout = true;
  setTimeout(function() {
    document.getElementById(ContinuePrompt).style.visibility = "visible";
    lockout = false;
  }, 3000);

  let title = document.createElement("div");
  title.className = "flex-column flex-center title-screen";
  title.id = "titleScreen";

  let h1 = document.createElement("h1");
  h1.innerHTML = "Odin Flash";
  
  let h2 = document.createElement("h2");
  h2.innerHTML = "Press any key to continue.";
  h2.id = ContinuePrompt;
  h2.style.visibility = "hidden";

  title.appendChild(h1);
  title.appendChild(h2);

  return title;
}

const TitleControls = (keystroke) => {
  if (!lockout) {
    PlayEffect(AudioEffects.Select);
    ScreenChange(GameConstants.CurrentScreen.MainMenu);
  }
}

export { TitleScreen, TitleControls };