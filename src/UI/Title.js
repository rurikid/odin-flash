import { ScreenChange } from "../../index.js";
import { GameConstants } from "../GameState.js";

const TitleScreen = () => {
  let title = document.createElement("div");
  title.className = "flex-column flex-center title-screen";
  title.id = "titleScreen";

  let h1 = document.createElement("h1");
  h1.innerHTML = "Odin Flash";
  
  let h2 = document.createElement("h2");
  h2.innerHTML = "Press any button to continue.";

  title.appendChild(h1);
  title.appendChild(h2);

  return title;
}

const TitleControls = (keystroke) => {
  ScreenChange(GameConstants.CurrentScreen.Gameplay);
}

export { TitleScreen, TitleControls };