import { GameState, GameConstants } from "./GameState.js";
import { SetGameplayTarget, SelectGameplayTarget } from "./UI/Gameplay.js";

const ControlConstants = {
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
  Select: "Select"
}

const initControls = () => {
  document.addEventListener('keydown', (e) => {
     switch (e.code) {
      case "ArrowUp":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Up);
        break;
      case "ArrowDown":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Down);
        break;
      case "ArrowLeft":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Left);
        break;
      case "ArrowRight":
        SetTarget(GameConstants.PlayerOne, ControlConstants.Right);
        break;
      case "Enter":
        SelectTarget(GameConstants.PlayerOne, ControlConstants.Select);
        break;
      case "KeyW":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Up);
        break;
      case "KeyS":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Down);
        break;
      case "KeyA":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Left);
        break;
      case "KeyD":
        SetTarget(GameConstants.PlayerTwo, ControlConstants.Right);
        break;
      case "Space":
        SelectTarget(GameConstants.PlayerTwo, ControlConstants.Select);
        break;
    }
  });
}

const SetTarget = (player, direction) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      SetGameplayTarget(player, direction);
      break;
  }
}

const SelectTarget = (player) => {
  switch (GameState.CurrentScreen)
  {
    case GameConstants.CurrentScreen.Gameplay:
      SelectGameplayTarget(player);
      break;
  }
}

export { initControls, ControlConstants };