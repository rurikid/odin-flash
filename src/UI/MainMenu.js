import { ControlConstants } from "../Controls.js";
import { GameConstants, GameState } from "../GameState.js";
import { ScreenChange } from "../../index.js";

let targetIndex = 0;

const MainMenuOptions = {
  Survival: {
    ContainerID: "survival",
    Header: "Survival",
    Subheader: "Choices have consequences, survive as long as possible!",
  },
  TimeAttack: {
    ContainerID: "timeAttack",
    Header: "Time Attack",
    Subheader: "Complete as many prompts as possible before time is up!"
  },
  TwoPlayer: {
    ContainerID: "twoPlayer",
    Header: "Two Player",
    Subheader: "Play head to head against your arch rival!"
  },
  GameOptions: {
    ContainerID: "gameOptions",
    Header: "Game Options",
    Subheader: null
  }
}

// TODO: Keep <h1>Odin Flash</h1> position consistent with Title
const MainMenuScreen = () => {
  targetIndex = 0;

  let mainMenuScreen = document.createElement("div");
  mainMenuScreen.className = "flex-column flex-center main-menu-screen";
  mainMenuScreen.id = "mainMenuScreen";
  // TODO: selected should programmatically target the targetIndex h2
  mainMenuScreen.innerHTML = `<h1>Odin Flash</h1>`

  for (let item in MainMenuOptions) {
    mainMenuScreen.appendChild(mainMenuItem(MainMenuOptions[item]));
  }

  mainMenuScreen.querySelectorAll("div")[targetIndex].children[0].classList.add("targeted");
  mainMenuScreen.querySelectorAll("div")[targetIndex].children[1].style.visibility = "visible";

  return mainMenuScreen;
}

const mainMenuItem = (option) => {
  let container = document.createElement("div");
  container.id = option.ContainerID;
  container.className = "flex-column flex-center";

  let head = document.createElement("h2");
  head.innerHTML = option.Header;

  let subhead = document.createElement("h3");
  subhead.innerHTML = option.Subheader;
  subhead.style.visibility = "hidden";

  container.appendChild(head);
  container.appendChild(subhead);

  return container;
}

const updateTarget = (keystroke) => {
  let menuOptions = document.getElementById("mainMenuScreen")
    .querySelectorAll("div");

  menuOptions[targetIndex].children[0].classList.remove("targeted");
  if (menuOptions[targetIndex].children.length > 0) {
    menuOptions[targetIndex].children[1].style.visibility = "hidden";
  }

  switch (keystroke) {
    case ControlConstants.Up:
      targetIndex = targetIndex === 0 ? 0 : targetIndex - 1;
      break;
    case ControlConstants.Down:
      targetIndex = targetIndex === menuOptions.length - 1 ?
        menuOptions.length - 1 : targetIndex + 1;
      break;
  }

  menuOptions[targetIndex].children[0].classList.add("targeted");
  if (menuOptions[targetIndex].children.length > 0) {
    menuOptions[targetIndex].children[1].style.visibility = "visible";
  }
}

const MainMenuControls = (keystroke) => {
  let menuOptions = document.getElementById("mainMenuScreen")
    .querySelectorAll("div");

  if (keystroke === ControlConstants.Select)
  {
    switch (menuOptions[targetIndex].id) {
      case MainMenuOptions.Survival.ContainerID:
        GameState.CurrentGameMode = GameConstants.GameMode.Survival;
        ScreenChange(GameConstants.CurrentScreen.Gameplay);
        break;
      case MainMenuOptions.TimeAttack.ContainerID:
        GameState.CurrentGameMode = GameConstants.GameMode.TimeAttack;
        ScreenChange(GameConstants.CurrentScreen.Gameplay);
        break;
      case MainMenuOptions.TwoPlayer.ContainerID:
        GameState.CurrentGameMode = GameConstants.GameMode.TwoPlayer;
        ScreenChange(GameConstants.CurrentScreen.Gameplay);
        break;
      case MainMenuOptions.GameOptions.ContainerID:
        ScreenChange(GameConstants.CurrentScreen.GameOptions);
        break;
    }
    return;
  } else if (keystroke === ControlConstants.Up ||
             keystroke === ControlConstants.Down) {
    updateTarget(keystroke);
  }
}

export { MainMenuScreen, MainMenuControls };