import { GameState, GameConstants } from "./GameState.js";
import { TitleControls } from "./UI/Title.js";
import { SetGameplayTarget, SelectGameplayTarget } from "./UI/Gameplay.js";

const ControlConstants = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  Select: "Select"
}

const InitControls = () => {
  document.addEventListener('keydown', (e) => {
    switch (GameState.CurrentScreen) {
      case GameConstants.CurrentScreen.Title:
        titleControls(e.code);
        break;
      case GameConstants.CurrentScreen.Gameplay:
        gameplayControls(e.code);
        break;
    }
  });
}

const titleControls = (keystroke) => {
  TitleControls(keystroke);
}

const gameplayControls = (keystroke) => {
  switch (keystroke) {
    case "ArrowUp":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Up);
      break;
    case "ArrowDown":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Down);
      break;
    case "ArrowLeft":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Left);
      break;
    case "ArrowRight":
      SetGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Right);
      break;
    case "Enter":
      SelectGameplayTarget(GameConstants.PlayerTwo, ControlConstants.Select);
      break;
    case "KeyW":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Up);
      break;
    case "KeyS":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Down);
      break;
    case "KeyA":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Left);
      break;
    case "KeyD":
      SetGameplayTarget(GameConstants.PlayerOne, ControlConstants.Right);
      break;
    case "Space":
      SelectGameplayTarget(GameConstants.PlayerOne, ControlConstants.Select);
      break;
  }
}

export { InitControls, ControlConstants };