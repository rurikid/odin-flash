import { ControlConstants } from "../Controls.js";
import { GameConstants } from "../GameState.js";
import { ScreenChange } from "../../index.js";

let targetIndex = 0;
const MainMenuIDs = {
  Survival: "survival",
  TimeAttack: "timeAttack",
  TwoPlayer: "twoPlayer",
  GameOptions: "gameOptions"
}

// TODO: Keep <h1>Odin Flash</h1> position consistent with Title
const MainMenuScreen = () => {
  targetIndex = 0;

  let mainMenuScreen = document.createElement("div");
  mainMenuScreen.className = "flex-column flex-center main-menu-screen";
  mainMenuScreen.id = "mainMenuScreen";
  // TODO: selected should programmatically target the targetIndex h2
  mainMenuScreen.innerHTML = `
    <h1>Odin Flash</h1>
    <h2 class="targeted" id="${MainMenuIDs.TwoPlayer}">Two Player</h2>
    <h2 id="${MainMenuIDs.GameOptions}">Game Options</h2>`;

  return mainMenuScreen;
}

const MainMenuControls = (keystroke) => {
  let menuOptions = document.getElementById("mainMenuScreen")
    .querySelectorAll("h2");

  if (keystroke === ControlConstants.Select)
  {
    switch (menuOptions[targetIndex].id) {
      case MainMenuIDs.Survival:
        break;
      case MainMenuIDs.TimeAttack:
        break;
      case MainMenuIDs.TwoPlayer:
        ScreenChange(GameConstants.CurrentScreen.Gameplay);
        break;
      case MainMenuIDs.GameOptions:
        break;
    }
    return;
  }

  menuOptions[targetIndex].removeAttribute('class');

  if (keystroke === ControlConstants.Up)
  {
    targetIndex = targetIndex === 0 ? 0 : targetIndex - 1;
  }
  else if (keystroke === ControlConstants.Down)
  {
    targetIndex = targetIndex === menuOptions.length - 1 ?
      menuOptions.length - 1 : targetIndex + 1;
  }

  menuOptions[targetIndex].className = "targeted";
}

export { MainMenuScreen, MainMenuControls };